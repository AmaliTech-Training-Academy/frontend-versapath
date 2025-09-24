import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((q) => ({
    matches: false,
    media: q,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock("@/lib/schemas/add-category", () => {
  return {
    addCategorySchema: {
      parse: (data: any) => {
        if (!data?.name || String(data.name).trim() === "") {
          const err: any = new Error("Invalid");
          err.errors = [{ path: ["name"], message: "Required" }];
          throw err;
        }
        return data;
      },
    },
  };
});

const toastSuccess = vi.fn();
vi.mock("sonner", () => ({
  toast: { success: (...args: any[]) => toastSuccess(...args) },
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

vi.mock("@/components/custom/custom-input", () => ({
  CustomInput: ({ label, type = "text", value, onChange, ...rest }: any) => (
    <label>
      <span>{label}</span>
      <input
        aria-label={label}
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        {...rest}
      />
    </label>
  ),
}));

vi.mock("@/components/custom/file-upload", () => ({
  FileUpload: ({ label, value, onChangeAction }: any) => (
    <label>
      <span>{label}</span>
      <input
        aria-label={label}
        type="file"
        onChange={(e) => onChangeAction?.(e.target.files?.[0])}
      />
      <div data-testid="file-name">{value?.name ?? ""}</div>
    </label>
  ),
}));

const sheetCloseClickSpy = vi.fn();
vi.mock("@/components/ui/sheet", async () => {
  const React = await import("react");

  const SheetClose = React.forwardRef<HTMLButtonElement, any>(
    ({ asChild, children, onClick, ...rest }, ref) => {
      const handleClick = (e: any) => {
        sheetCloseClickSpy();
        onClick?.(e);
      };

      if (asChild && React.isValidElement(children)) {
        const child = children as React.ReactElement<any>;
        return React.cloneElement(child, {
          ...rest,
          onClick: (...args: any[]) => {
            child.props?.onClick?.(...args);
            handleClick(args[0]);
          },
          ref,
        });
      }

      return <button ref={ref} onClick={handleClick} {...rest} />;
    }
  );

  SheetClose.displayName = "SheetClose";
  return { SheetClose };
});

vi.mock("lucide-react", () => ({
  Loader: (props: any) => <svg aria-label="loader" {...props} />,
}));

vi.mock("@hookform/resolvers/zod", () => ({
  zodResolver:
    (schema: any) =>
      async (values: any): Promise<any> => {
        try {
          const parsed = schema.parse(values);
          return { values: parsed, errors: {} };
        } catch (e: any) {
          const errMap: any = {};
          e?.errors?.forEach((zErr: any) => {
            errMap[zErr.path?.[0] ?? "name"] = { message: zErr.message, type: "zod" };
          });
          return { values: {}, errors: errMap };
        }
      },
}));

let resolveApi!: (val: any) => void;
vi.mock("@/lib/api/api-request", () => ({
  apiRequest: vi.fn(() => {
    return new Promise((resolve) => {
      resolveApi = resolve;
    });
  }),
}));

import { AddCategoryForm } from "@/app/dashboard/skill-categories/components/add-category-form";

const typeInto = async (label: string, text: string) => {
  const input = await screen.findByLabelText(label);
  await userEvent.clear(input);
  await userEvent.type(input, text);
  return input;
};

const revalidateSpy = vi.fn();

describe("AddCategoryForm", () => {
  beforeEach(() => {
    toastSuccess.mockClear();
    sheetCloseClickSpy.mockClear();
    revalidateSpy.mockClear();
  });

  it("renders required fields", () => {
    render(<AddCategoryForm revalidateAction={revalidateSpy} />);
    expect(screen.getByLabelText("Category Name *")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Cover")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add category/i })).toBeInTheDocument();
  });

  it("does not submit when name is empty (zod validation) and does not toast", async () => {
    render(<AddCategoryForm revalidateAction={revalidateSpy} />);
    await userEvent.click(screen.getByRole("button", { name: /add category/i }));
    expect(toastSuccess).not.toHaveBeenCalled();
    expect(revalidateSpy).not.toHaveBeenCalled();
  });

  it("shows loader while submitting, then toasts, resets, calls revalidateAction, and triggers SheetClose programmatically", async () => {
    const clickSpy = vi.spyOn(HTMLButtonElement.prototype, "click");

    render(<AddCategoryForm revalidateAction={revalidateSpy} />);

    await typeInto("Category Name *", "Data Science");

    const file = new File(["dummy"], "cover.png", { type: "image/png" });
    const fileInput = screen.getByLabelText("Cover");
    await userEvent.upload(fileInput, file);
    expect(screen.getByTestId("file-name").textContent).toBe("cover.png");

    const submitBtn = screen.getByRole("button", { name: /add category/i });
    await userEvent.click(submitBtn);

    expect(screen.getByLabelText("loader")).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    // resolve the API request
    resolveApi({
      success: true,
      message: "OK",
      data: { item: { id: "1", name: "Data Science" } },
    });
    await Promise.resolve();

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith("Skill category added successfully!");
    });

    await waitFor(() => {
      expect(screen.queryByLabelText("loader")).not.toBeInTheDocument();
      expect(submitBtn).not.toBeDisabled();
    });

    // inputs are reset
    expect(screen.getByLabelText("Category Name *")).toHaveValue("");
    expect(screen.getByTestId("file-name").textContent).toBe("");

    expect(revalidateSpy).toHaveBeenCalled();

    // SheetClose hidden button was programmatically clicked
    expect(clickSpy).toHaveBeenCalled();

    clickSpy.mockRestore();
  });

  it("Cancel button is present and clickable (delegates to SheetClose)", async () => {
    render(<AddCategoryForm revalidateAction={revalidateSpy} />);
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelBtn);
    expect(sheetCloseClickSpy).toHaveBeenCalledTimes(1);
  });
});
