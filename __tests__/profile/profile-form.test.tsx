vi.mock("next-auth/react", () => {
  return { useSession: vi.fn() };
});

vi.mock("@/lib/api/api-request", () => {
  return { apiRequest: vi.fn() };
});

vi.mock("sonner", () => {
  return { toast: { success: vi.fn(), error: vi.fn() } };
});

vi.mock("next/image", () => {
  type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    src: string | { src: string };
    alt: string;
  };
  const Img = (props: ImgProps) => {
    const { src, alt, ...rest } = props;
    const resolved = typeof src === "string" ? src : src?.src ?? "";
    return <img src={resolved} alt={alt} {...rest} />;
  };
  return { default: Img };
});

import React from "react";
import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as nextAuth from "next-auth/react";
import * as apiModule from "@/lib/api/api-request";
import { toast } from "sonner";
import { ProfileForm } from "@/app/dashboard/profile/components/profile-form";
import type { Session } from "next-auth";
import { Roles } from "@/lib/types";

type ApiResult<T> = { success: boolean; data?: T; message?: string; errors?: string[] };
type ApiRequest = <T>(url: string, method?: string, body?: unknown) => Promise<ApiResult<T>>;

type UseSessionMockValue = {
  data: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  update: (data?: unknown) => Promise<Session | null>;
};

const useSessionMock = nextAuth.useSession as Mock<() => UseSessionMockValue>;
const apiRequestMock = apiModule.apiRequest as Mock<ApiRequest>;

const createObjectURLMock = vi.fn(() => "blob:preview-url");
const revokeObjectURLMock = vi.fn();

const makeSession = (overrides?: Partial<Session>): Session => ({
  user: {
    id: "u1",
    email: "bob@example.com",
    firstName: "Bob",
    lastName: "Karemera",
    username: "bkaremera",
    phoneNumber: "+250788000000",
    profilePictureUrl: "https://cdn.example.com/pp.jpg",
    role: Roles.ADMIN,
  } as Session["user"],
  expires: new Date(Date.now() + 60_000).toISOString(),
  ...overrides,
});

let updateSpy: ReturnType<typeof vi.fn>;

const renderWithSession = (opts?: { status?: UseSessionMockValue["status"]; session?: Session | null }) => {
  const data = opts?.session ?? makeSession();
  const status = opts?.status ?? "authenticated";
  updateSpy = vi.fn(async (payload?: unknown) => {
    if (data && payload && typeof payload === "object") {
      const next = structuredClone(data);
      Object.assign(next, payload);
      return next;
    }
    return data;
  });

  useSessionMock.mockReturnValue({
    data,
    status,
    update: updateSpy,
  });

  return render(<ProfileForm />);
};

beforeEach(() => {
  vi.clearAllMocks();

  // define URL methods for JSDOM
  Object.defineProperty(globalThis.URL, "createObjectURL", {
    value: createObjectURLMock,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(globalThis.URL, "revokeObjectURL", {
    value: revokeObjectURLMock,
    writable: true,
    configurable: true,
  });

  createObjectURLMock.mockClear();
  revokeObjectURLMock.mockClear();
});

type ProfileJson = {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
};

function looksLikeProfileJson(obj: unknown): obj is ProfileJson {
  return !!obj &&
    typeof obj === "object" &&
    "firstName" in obj &&
    "lastName" in obj &&
    "username" in obj &&
    "phoneNumber" in obj;
}

describe("ProfileForm", () => {
  it("renders loading state when session status is loading", () => {
    renderWithSession({ status: "loading", session: null });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("hydrates form fields from session when authenticated (with CustomInput)", async () => {
    renderWithSession();

    expect(screen.getByLabelText(/first name/i)).toHaveValue("Bob");
    expect(screen.getByLabelText(/last name/i)).toHaveValue("Karemera");
    expect(screen.getByLabelText(/username/i)).toHaveValue("bkaremera");
    expect(screen.getByLabelText(/phone number/i)).toHaveValue("+250788000000");

    const img = screen.getByAltText(/bkaremera image/i);
    expect((img as HTMLImageElement).src).toContain("https://cdn.example.com/pp.jpg");
  });

  it("creates a preview URL when file selected and clears it when removed", async () => {
    renderWithSession();
    const user = userEvent.setup();

    const fileInput = screen
      .getByLabelText(/first name/i)
      .closest("form")!
      .querySelector('input[type="file"]#profile-image-input') as HTMLInputElement;

    const file = new File(["avatar"], "avatar.png", { type: "image/png" });
    await user.upload(fileInput, file);

    const img = screen.getByAltText(/bkaremera image/i);
    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
    expect((img as HTMLImageElement).src).toContain("blob:preview-url");

    const removeBtn = screen.getByRole("button", { name: /remove photo/i });
    await user.click(removeBtn);

    await waitFor(() => {
      expect(revokeObjectURLMock).toHaveBeenCalled();
    });

    expect((img as HTMLImageElement).src).toContain("https://cdn.example.com/pp.jpg");
  });

  it("submits form with FormData and handles JSON response: updates session, clears image, shows success toast", async () => {
    renderWithSession();
    const user = userEvent.setup();

    const firstName = await screen.findByLabelText(/first name/i);
    await user.clear(firstName);
    await user.type(firstName, "Robert");

    const fileInput = screen
      .getByLabelText(/first name/i)
      .closest("form")!
      .querySelector('input[type="file"]#profile-image-input') as HTMLInputElement;
    const file = new File(["avatar"], "avatar.png", { type: "image/png" });
    await user.upload(fileInput, file);

    const serverUser = {
      id: "u1",
      email: "bob@example.com",
      username: "bkaremera",
      role: Roles.ADMIN,
      firstName: "Robert",
      lastName: "Karemera",
      profilePictureUrl: "https://cdn.example.com/pp-new.jpg",
      phoneNumber: "+250788000000",
    };

    apiRequestMock.mockResolvedValueOnce({
      success: true,
      data: serverUser,
      message: "ok",
    });

    const submit = screen.getByRole("button", { name: /save change\(s\)/i });
    await user.click(submit);

    await waitFor(() => {
      expect(apiRequestMock).toHaveBeenCalledTimes(1);
    });

    const [url, method, body] = apiRequestMock.mock.calls[0] as [string, string, FormData];
    expect(url).toBe("/users/profile");
    expect(method).toBe("PATCH");
    expect(body).toBeInstanceOf(FormData);

    // Ensure FormData includes the expected parts

    // 1) profilePicture must be a File
    const pictureEntry = body.get("profilePicture");
    expect(pictureEntry).toBeInstanceOf(File);

    // 2) profile must exist and be JSON-like (Blob/File with application/json OR a JSON string)
    let profileEntry = body.get("profile");

    // If .get("profile") was null, try to find by MIME type
    if (!profileEntry) {
      for (const [, v] of body.entries()) {
        if (v instanceof Blob && v.type === "application/json") {
          profileEntry = v;
          break;
        }
      }
    }

    expect(profileEntry, 'expected a "profile" part in FormData').toBeTruthy();

    if (profileEntry instanceof Blob) {
      expect(profileEntry.size).toBeGreaterThan(0);
      if (profileEntry.type) expect(profileEntry.type).toBe("application/json");
    } else {
      // String path: should be valid JSON
      expect(typeof profileEntry).toBe("string");
      expect(() => JSON.parse(profileEntry as string)).not.toThrow();
    }

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith("Profile updated successfully"),
    );
    expect(updateSpy).toHaveBeenCalledTimes(1);

    // We can't rely on a rerender from next-auth in this unit test,
    // so assert we requested the session to be updated with the new fields.
    expect(updateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.objectContaining({
          firstName: "Robert",
          lastName: "Karemera",
          username: "bkaremera",
          phoneNumber: "+250788000000",
          profilePictureUrl: "https://cdn.example.com/pp-new.jpg",
        }),
      }),
    );
  });


  it("shows an error toast if submit fails and does not call update", async () => {
    renderWithSession();
    const user = userEvent.setup();

    const firstName = await screen.findByLabelText(/first name/i);
    await user.type(firstName, "X");

    apiRequestMock.mockResolvedValueOnce({
      success: false,
      message: "Bad Request",
      errors: ["invalid"],
    });

    const submit = screen.getByRole("button", { name: /save change\(s\)/i });
    await user.click(submit);

    await waitFor(() => {
      expect(apiRequestMock).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalled();
    });
    expect(updateSpy).not.toHaveBeenCalled();
  });

  it('when "Remove Photo" clicked with only existing URL, calls PATCH to remove and updates session', async () => {
    const session = makeSession({
      user: {
        ...(makeSession().user),
        profilePictureUrl: "https://cdn.example.com/pp.jpg",
      },
    });
    renderWithSession({ session });

    const user = userEvent.setup();
    const removeBtn = await screen.findByRole("button", { name: /remove photo/i });

    apiRequestMock.mockResolvedValueOnce({
      success: true,
      data: {
        id: "u1",
        email: "bob@example.com",
        username: "bkaremera",
        role: Roles.LEARNER,
        firstName: "Bob",
        lastName: "Karemera",
        profilePictureUrl: undefined,
        phoneNumber: "+250788000000"
      },
      message: "removed",
    });

    await user.click(removeBtn);

    await waitFor(() => {
      expect(apiRequestMock).toHaveBeenCalledTimes(1);
      const call = apiRequestMock.mock.calls[0];
      expect(call[0]).toBe("/users/profile-picture");
      expect(call[1]).toBe("PATCH");

      expect(toast.success).toHaveBeenCalledWith("removed");
    });


    expect(updateSpy).toHaveBeenCalledTimes(1);

    const img = screen.getByAltText(/bkaremera image/i);
    expect((img as HTMLImageElement).src).not.toContain("https://cdn.example.com/pp.jpg");
  });
});