import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import type { ReactNode } from "react";
import type {
  Control,
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

import { AddCategoryForm } from "@/app/dashboard/skill-categories/components/add-category-form";

// Mock Zod schema to require "name"
vi.mock("@/lib/schemas/add-category", () => {
  return {
    addCategorySchema: {
      parse: (data: Record<string, unknown>) => {
        const name = typeof data?.name === "string" ? data.name.trim() : "";
        if (!name) {
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

// Mock toast.success
const toastSuccess = vi.fn();
vi.mock("sonner", () => ({
  toast: { success: (...args: unknown[]) => toastSuccess(...args) },
}));

//Mock of shadcn/ui form layer using RHF FormProvider + Controller
vi.mock("@/components/ui/form", () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require("react");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FormProvider, Controller } = require("react-hook-form");

  type FormProps<TFieldValues extends FieldValues = FieldValues> =
    UseFormReturn<TFieldValues> & { children: ReactNode };

  const Form = <TFieldValues extends FieldValues>({
    children,
    ...form
  }: FormProps<TFieldValues>) => <FormProvider {...form}>{children}</FormProvider>;

  const FormItem = ({ children }: { children?: ReactNode }) => (
    <div data-testid="form-item">{children}</div>
  );

  const FormControl = ({ children }: { children?: ReactNode }) => (
    <div data-testid="form-control">{children}</div>
  );

  const FormMessage = ({ children }: { children?: ReactNode }) => (
    <div role="alert">{children}</div>
  );

  interface FormFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends string = string,
  > {
    name: TName;
    control: Control<TFieldValues>;
    render: (props: { field: ControllerRenderProps<TFieldValues, TName> }) => ReactNode;
  }

  const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends string = string,
  >({
    name,
    control,
    render,
  }: FormFieldProps<TFieldValues, TName>) => (
    <Controller<TFieldValues, TName>
      name={name}
      control={control}
      render={({ field }) => render({ field })}
    />
  );

  return { Form, FormField, FormItem, FormControl, FormMessage };
});

// Mock Button → plain <button>
vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    ...props
  }: {
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    className?: string;
    disabled?: boolean;
    [key: string]: unknown;
  }) => <button {...props}>{children}</button>,
}));

// Mock CustomInput
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
        onChange={(e) => onChange?.(e.currentTarget.value)}
        {...rest}
      />
    </label>
  ),
}));

// Mock FileUpload
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
        onChange={(e) => onChangeAction?.(e.currentTarget.files?.[0])}
      />
      <div data-testid="file-name">{value?.name ?? ""}</div>
    </label>
  ),
}));

// Mock SheetClose
const sheetCloseClickSpy = vi.fn();
vi.mock("@/components/ui/sheet", async () => {
  const React = await import("react");

  const SheetClose = React.forwardRef<
    HTMLButtonElement,
    {
      asChild?: boolean;
      children?: React.ReactNode;
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    }
  >(({ asChild, children, onClick, ...rest }, ref) => {
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<
        React.ButtonHTMLAttributes<HTMLButtonElement>
      >;
      const mergedOnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        sheetCloseClickSpy();
        child.props?.onClick?.(e);
        onClick?.(e);
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

// Mock lucide-react Loader
vi.mock("lucide-react", () => ({
  Loader: (props: Record<string, unknown>) => <svg {...props} />,
}));

// Mock zodResolver to call schema.parse and surface errors
vi.mock("@hookform/resolvers/zod", () => ({
  zodResolver:
    (schema: { parse: (v: unknown) => unknown }) =>
    async (values: unknown): Promise<{ values: unknown; errors: Record<string, unknown> }> => {
      try {
        const parsed = schema.parse(values);
        return { values: parsed, errors: {} };
      } catch (e: unknown) {
        const err = e as { errors?: Array<{ path?: string[]; message?: string }> };
        const errMap: Record<string, { message: string; type: string }> = {};
        (err.errors ?? []).forEach((zErr) => {
          const key = zErr.path?.[0] ?? "name";
          errMap[key] = { message: zErr.message ?? "Invalid", type: "zod" };
        });
        return { values: {}, errors: errMap };
      }
    },
}));

// Mock apiRequest
let resolveApi!: (val: unknown) => void;
vi.mock("@/lib/api/api-request", () => ({
  apiRequest: vi.fn(() => {
    return new Promise((resolve) => {
      resolveApi = resolve;
    });
  }),
}));

import { apiRequest } from "@/lib/api/api-request";

const typeInto = async (label: string, text: string): Promise<HTMLInputElement> => {
  const input = await screen.findByLabelText(label);
  await userEvent.clear(input);
  await userEvent.type(input, text);
  return input;
};

const revalidateSpy = vi.fn();

describe("AddCategoryForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

    expect(apiRequest.mock.calls.length).toBe(0);
    expect(toastSuccess).not.toHaveBeenCalled();
    expect(revalidateSpy).not.toHaveBeenCalled();
  });

  it("disables submit while submitting, then toasts, resets, calls revalidateAction, and triggers SheetClose programmatically", async () => {
    const clickSpy = vi.spyOn(HTMLButtonElement.prototype, "click");

    render(<AddCategoryForm revalidateAction={revalidateSpy} />);

    await typeInto("Category Name *", "Data Science");

    // attach a fake file
    const file = new File(["dummy"], "cover.png", { type: "image/png" });
    const fileInput = screen.getByLabelText("Cover");
    await userEvent.upload(fileInput, file);
    expect(screen.getByTestId("file-name").textContent).toBe("cover.png");

    const submitBtn = screen.getByRole("button", { name: /add category/i });
    await userEvent.click(submitBtn);

    // when submitting, submit button is disabled (isSubmitting = true)
    await waitFor(() => expect(submitBtn).toBeDisabled());

    // resolve the API request
    resolveApi({
      success: true,
      message: "OK",
      data: { item: { id: "1", name: "Data Science" } },
    });
    await Promise.resolve();

    // toast matches component string
    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith(
        "Skill category added successfully!"
      );
    });

    // After submission, submit button is enabled
    await waitFor(() => expect(submitBtn).not.toBeDisabled());

    // inputs reset
    expect(screen.getByLabelText("Category Name *")).toHaveValue("");
    expect(screen.getByTestId("file-name").textContent).toBe("");

    // revalidate and hidden SheetClose button clicked
    expect(revalidateSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();

    clickSpy.mockRestore();
  });

  it("renders a single Cancel button and clicking it delegates to SheetClose", async () => {
    render(<AddCategoryForm revalidateAction={revalidateSpy} />);
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelBtn);
    expect(sheetCloseClickSpy).toHaveBeenCalledTimes(1);
  });
});