import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import React from "react";

// ───────────────────────────────────────────────────────────────────────────────
// Mocks
// ───────────────────────────────────────────────────────────────────────────────

// 1) Mock Zod schema to enforce "name" required without pulling real Zod
vi.mock("@/lib/schemas/add-category", () => {
  return {
    addCategorySchema: {
      parse: (data: Record<string, unknown>) => {
        if (!data?.name || String(data.name).trim() === "") {
          const err = new Error("Invalid") as Error & {
            errors?: Array<{ path: string[]; message: string }>;
          };
          err.errors = [{ path: ["name"], message: "Required" }];
          throw err;
        }
        return data;
      },
    },
  };
});

// 2) Mock toast.success
const toastSuccess = vi.fn();
vi.mock("sonner", () => ({
  toast: { success: (...args: unknown[]) => toastSuccess(...args) },
}));

// 3) Faithful mock of shadcn/ui form layer using RHF FormProvider + Controller
vi.mock("@/components/ui/form", () => {
  const React = require("react");
  const { FormProvider, Controller } = require("react-hook-form");

  const Form = ({ children, ...form }: any) => (
    <FormProvider {...form}>{children}</FormProvider>
  );

  const FormItem = ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="form-item">{children}</div>
  );
  const FormControl = ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="form-control">{children}</div>
  );
  const FormMessage = ({ children }: { children?: React.ReactNode }) => (
    <div role="alert">{children}</div>
  );

  const FormField = ({
    name,
    control,
    render,
  }: {
    name: string;
    control: unknown;
    render: (props: any) => React.ReactNode;
  }) => <Controller name={name} control={control as any} render={render} />;

  return { Form, FormField, FormItem, FormControl, FormMessage };
});

// 4) Mock Button to be a plain <button>
vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => <button {...props}>{children}</button>,
}));

// 5) Mock CustomInput (text input with aria-label equal to label)
vi.mock("@/components/custom/custom-input", () => ({
  CustomInput: ({
    label,
    type = "text",
    value,
    onChange,
    ...rest
  }: {
    label: string;
    type?: string;
    value?: string;
    onChange?: (val: string) => void;
    [key: string]: unknown;
  }) => (
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

// 6) Mock FileUpload, wiring onChangeAction(file)
vi.mock("@/components/custom/file-upload", () => ({
  FileUpload: ({
    label,
    value,
    onChangeAction,
  }: {
    label: string;
    value?: File;
    onChangeAction?: (file: File | undefined) => void;
  }) => (
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

// 7) Mock SheetClose to honor asChild (no nested buttons) and track clicks
const sheetCloseClickSpy = vi.fn();
vi.mock("@/components/ui/sheet", async () => {
  const React = await import("react");

  const SheetClose = React.forwardRef<
    HTMLButtonElement,
    {
      asChild?: boolean;
      children?: React.ReactNode;
      onClick?: (e: unknown) => void;
      [key: string]: unknown;
    }
  >(({ asChild, children, onClick, ...rest }, ref) => {
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      const mergedOnClick = (...args: any[]) => {
        sheetCloseClickSpy();
        child.props?.onClick?.(...args);
        onClick?.(...args);
      };
      return React.cloneElement(child, { ref, onClick: mergedOnClick, ...rest });
    }
    return (
      <button
        ref={ref}
        onClick={(e) => {
          sheetCloseClickSpy();
          onClick?.(e);
        }}
        {...rest}
      >
        {children}
      </button>
    );
  });

  SheetClose.displayName = "SheetClose";
  return { SheetClose, __esModule: true };
});

// 8) Mock lucide-react Loader (we’re not asserting on it directly)
vi.mock("lucide-react", () => ({
  Loader: (props: Record<string, unknown>) => <svg {...props} />,
}));

// 9) Mock zodResolver to call schema.parse and surface errors
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
          errMap[zErr.path?.[0] ?? "name"] = {
            message: zErr.message,
            type: "zod",
          };
        });
        return { values: {}, errors: errMap };
      }
    },
}));

// 10) Mock apiRequest to be a pending promise we can resolve in test
let resolveApi!: (val: any) => void;
vi.mock("@/lib/api/api-request", () => ({
  apiRequest: vi.fn(() => {
    return new Promise((resolve) => {
      resolveApi = resolve;
    });
  }),
}));

// Import the mocked apiRequest for assertions in the "empty name" test
import { apiRequest } from "@/lib/api/api-request";

// ───────────────────────────────────────────────────────────────────────────────
// SUT
// ───────────────────────────────────────────────────────────────────────────────

import { AddCategoryForm } from "@/app/dashboard/skill-categories/components/add-category-form";

// ───────────────────────────────────────────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────────────────────────────────────────

const typeInto = async (label: string, text: string) => {
  const input = await screen.findByLabelText(label);
  await userEvent.clear(input);
  await userEvent.type(input, text);
  return input;
};

const revalidateSpy = vi.fn();

// ───────────────────────────────────────────────────────────────────────────────
// Tests
// ───────────────────────────────────────────────────────────────────────────────

describe("AddCategoryForm", () => {
  beforeEach(() => {
    toastSuccess.mockClear();
    sheetCloseClickSpy.mockClear();
    revalidateSpy.mockClear();
    (apiRequest as unknown as jest.Mock | vi.Mock).mockClear?.();
  });

  it("renders required fields", () => {
    render(<AddCategoryForm revalidateAction={revalidateSpy} />);
    expect(screen.getByLabelText("Category Name *")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Cover")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add category/i })
    ).toBeInTheDocument();
  });

  it("does not submit when name is empty (zod validation) and does not toast", async () => {
    render(<AddCategoryForm revalidateAction={revalidateSpy} />);
    await userEvent.click(screen.getByRole("button", { name: /add category/i }));

    // No API call, no success toast, no revalidate
    expect(apiRequest).not.toHaveBeenCalled();
    expect(toastSuccess).not.toHaveBeenCalled();
    expect(revalidateSpy).not.toHaveBeenCalled();
  });

  it("shows disabled submit while submitting, then toasts, resets, calls revalidateAction, and triggers SheetClose programmatically", async () => {
    const clickSpy = vi.spyOn(HTMLButtonElement.prototype, "click");

    render(<AddCategoryForm revalidateAction={revalidateSpy} />);

    // Fill required "name"
    await typeInto("Category Name *", "Data Science");

    // Attach a fake file
    const file = new File(["dummy"], "cover.png", { type: "image/png" });
    const fileInput = screen.getByLabelText("Cover");
    await userEvent.upload(fileInput, file);
    expect(screen.getByTestId("file-name").textContent).toBe("cover.png");

    // Submit
    const submitBtn = screen.getByRole("button", { name: /add category/i });
    await userEvent.click(submitBtn);

    // During submit -> button disabled (isSubmitting = true)
    await waitFor(() => expect(submitBtn).toBeDisabled());

    // Resolve the API request
    resolveApi({
      success: true,
      message: "OK",
      data: { item: { id: "1", name: "Data Science" } },
    });
    await Promise.resolve();

    // Toast uses the exact message from the component
    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith(
        "Skill category added successfully!"
      );
    });

    // Post-submit -> button re-enabled
    await waitFor(() => expect(submitBtn).not.toBeDisabled());

    // Inputs are reset
    expect(screen.getByLabelText("Category Name *")).toHaveValue("");
    expect(screen.getByTestId("file-name").textContent).toBe("");

    // Revalidation and programmatic SheetClose click happened
    expect(revalidateSpy).toHaveBeenCalled();
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