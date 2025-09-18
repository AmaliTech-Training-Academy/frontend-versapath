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
<<<<<<< Updated upstream
      parse: (data: any) => {
        if (!data?.name || String(data.name).trim() === "") {
          const err: any = new Error("Invalid");
=======
      // react-hook-form + zodResolver will just call this
      // We emulate a minimal parse() shape like zod would do.
      // If name is empty-ish, throw; else succeed.
      parse: (data: Record<string, unknown>) => {
        if (!data?.name || String(data.name).trim() === "") {
          const err = new Error("Invalid") as Error & {
            errors?: Array<{ path: string[]; message: string }>;
          };
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  toast: { success: (...args: any[]) => toastSuccess(...args) },
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
=======
  toast: { success: (...args: unknown[]) => toastSuccess(...args) },
}));

// 3) Mock shadcn/ui <Form> and <FormField> with simple passthroughs
vi.mock("@/components/ui/form", () => {
  return {
    Form: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    FormField: ({
      render,
      name,
      control,
    }: {
      render: (props: {
        field: {
          name: string;
          value: unknown;
          onChange: (...args: unknown[]) => void;
          onBlur: (...args: unknown[]) => void;
          ref: (...args: unknown[]) => void;
        };
        fieldState: Record<string, unknown>;
        formState: Record<string, unknown>;
        control: unknown;
      }) => React.ReactNode;
      name: string;
      control: unknown;
    }) =>
      render({
        field: {
          name,
          value: undefined,
          onChange: vi.fn(), // RHF wires these; for our custom inputs we pass value/onChange down
          onBlur: vi.fn(),
          ref: vi.fn(),
        },
        fieldState: {},
        formState: {},
        control,
      }),
  };
});

// 4) Mock Button
vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => <button {...props}>{children}</button>,
>>>>>>> Stashed changes
}));

vi.mock("@/components/custom/custom-input", () => ({
<<<<<<< Updated upstream
  CustomInput: ({ label, type = "text", value, onChange, ...rest }: any) => (
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  FileUpload: ({ label, value, onChangeAction }: any) => (
=======
  FileUpload: ({
    label,
    value,
    onChangeAction,
  }: {
    label: string;
    value?: File;
    onChangeAction?: (file: File | undefined) => void;
  }) => (
>>>>>>> Stashed changes
    <label>
      <span>{label}</span>
      <input
        aria-label={label}
        type="file"
        onChange={(e) => onChangeAction?.(e.target.files?.[0])}
      />
      {/* reflect controlled value name (if any) for reset assertions */}
      <div data-testid="file-name">{value?.name ?? ""}</div>
    </label>
  ),
}));

const sheetCloseClickSpy = vi.fn();
vi.mock("@/components/ui/sheet", async () => {
  const React = await import("react");

<<<<<<< Updated upstream
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
=======
  const SheetClose = React.forwardRef<
    HTMLButtonElement,
    {
      asChild?: boolean;
      children?: React.ReactNode;
      onClick?: (e: unknown) => void;
      [key: string]: unknown;
    }
  >(({ asChild, children, onClick, ...rest }, ref) => {
    const handleClick = (e: unknown) => {
      sheetCloseClickSpy();
    //   if (typeof onClick === "function") {
    //     onClick(e);
    //   }
    };

    // If asChild, inject our click handler into the child instead of wrapping it
    // if (asChild && React.isValidElement(children)) {
    //   const child = children as React.ReactElement<unknown>;
    //   return React.cloneElement(child, {
    //     ...rest,
    //     onClick: (...args: unknown[]) => {
    //       if (typeof child.props?.onClick === "function") {
    //         child.props.onClick(...args);
    //       }
    //       handleClick(args[0]);
    //     },
    //     ref,
    //   });
    // }

    // Non-asChild (e.g., the hidden programmatic close button)
    return <button ref={ref} onClick={handleClick} {...rest} />;
  });
>>>>>>> Stashed changes

  SheetClose.displayName = "SheetClose";
  return { SheetClose };
});

vi.mock("lucide-react", () => ({
<<<<<<< Updated upstream
  Loader: (props: any) => <svg aria-label="loader" {...props} />,
=======
  Loader: (props: Record<string, unknown>) => (
    <svg aria-label="loader" {...props} />
  ),
>>>>>>> Stashed changes
}));

vi.mock("@hookform/resolvers/zod", () => ({
  zodResolver:
<<<<<<< Updated upstream
    (schema: any) =>
    async (values: any): Promise<any> => {
      try {
        const parsed = schema.parse(values);
        return { values: parsed, errors: {} };
      } catch (e: any) {
        const errMap: any = {};
        e?.errors?.forEach((zErr: any) => {
          errMap[zErr.path?.[0] ?? "name"] = { message: zErr.message, type: "zod" };
=======
    (schema: unknown) =>
    async (
      values: Record<string, unknown>
    ): Promise<{
      values: Record<string, unknown>;
      errors: Record<string, { message: string; type: string }>;
    }> => {
      try {
        // @ts-expect-error: schema is mocked
        const parsed = schema.parse(values);
        return { values: parsed, errors: {} };
      } catch (e) {
        const errMap: Record<string, { message: string; type: string }> = {};
        // @ts-expect-error: errors is mocked
        e?.errors?.forEach((zErr: { path?: string[]; message: string }) => {
          errMap[zErr.path?.[0] ?? "name"] = {
            message: zErr.message,
            type: "zod",
          };
>>>>>>> Stashed changes
        });
        return { values: {}, errors: errMap };
      }
    },
<<<<<<< Updated upstream
}));

const refetchSpy = vi.fn();
vi.mock("@/lib/hooks/use-clusters", () => ({
  useClusters: () => ({ refetch: refetchSpy }),
}));

let resolveApi!: (val: any) => void;
vi.mock("@/lib/api/api-request", () => ({
  apiRequest: vi.fn(() => {
    return new Promise((resolve) => {
      resolveApi = resolve;
    });
  }),
=======
>>>>>>> Stashed changes
}));

import { AddCategoryForm } from "@/app/dashboard/skill-categories/components/add-category-form";

const typeInto = async (label: string, text: string) => {
  const input = await screen.findByLabelText(label);
  await userEvent.clear(input);
  await userEvent.type(input, text);
  return input;
};

describe("<AddCategoryForm />", () => {
  beforeEach(() => {
<<<<<<< Updated upstream
    toastSuccess.mockClear();
    sheetCloseClickSpy.mockClear();
    refetchSpy.mockClear();
=======
    vi.useFakeTimers();
    toastSuccess.mockClear();
    sheetCloseClickSpy.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
>>>>>>> Stashed changes
  });

  it("renders required fields", () => {
    render(<AddCategoryForm />);
    expect(screen.getByLabelText("Category Name *")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Cover")).toBeInTheDocument();
<<<<<<< Updated upstream
    expect(screen.getByRole("button", { name: /add category/i })).toBeInTheDocument();
=======
    expect(
      screen.getByRole("button", { name: /add category/i })
    ).toBeInTheDocument();
>>>>>>> Stashed changes
  });

  it("does not submit when name is empty (zod validation) and does not toast", async () => {
    render(<AddCategoryForm />);
<<<<<<< Updated upstream
    await userEvent.click(screen.getByRole("button", { name: /add category/i }));
    expect(toastSuccess).not.toHaveBeenCalled();
  });

  it("shows loader while submitting, then toasts, resets, refetches, and triggers SheetClose programmatically", async () => {
=======
    await userEvent.click(
      screen.getByRole("button", { name: /add category/i })
    );
    // since schema rejects, submit handler shouldn't run
    expect(toastSuccess).not.toHaveBeenCalled();
  });

  it("shows loader while submitting, then fires toast, resets, and triggers SheetClose programmatically", async () => {
    // Spy on the programmatic click() used on the hidden SheetClose
>>>>>>> Stashed changes
    const clickSpy = vi.spyOn(HTMLButtonElement.prototype, "click");

    render(<AddCategoryForm />);

<<<<<<< Updated upstream
    await typeInto("Category Name *", "Data Science");

=======
    // fill the required "name"
    await typeInto("Category Name *", "Data Science");

    // Attach a fake file
>>>>>>> Stashed changes
    const file = new File(["dummy"], "cover.png", { type: "image/png" });
    const fileInput = screen.getByLabelText("Cover");
    await userEvent.upload(fileInput, file);
    expect(screen.getByTestId("file-name").textContent).toBe("cover.png");

<<<<<<< Updated upstream
    const submitBtn = screen.getByRole("button", { name: /add category/i });
    await userEvent.click(submitBtn);

    expect(screen.getByLabelText("loader")).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    resolveApi({
      success: true,
      message: "OK",
      data: { item: { id: "1", name: "Data Science" } },
    });
    await Promise.resolve();

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith("Skill category added successfully!");
    });

=======
    // Submit
    const submitBtn = screen.getByRole("button", { name: /add category/i });
    expect(submitBtn).not.toBeDisabled();
    await userEvent.click(submitBtn);

    // Loader should be visible during submit
    expect(screen.getByLabelText("loader")).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    // advance the artificial 5s delay in onSubmit
    vi.advanceTimersByTime(5000);

    // wait for post-submit effects to settle
    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith(
        "Category added successfully",
        expect.objectContaining({
          action: expect.objectContaining({
            label: "Undo",
            onClick: expect.any(Function),
          }),
        })
      );
    });

    // Loader gone, submit re-enabled
>>>>>>> Stashed changes
    await waitFor(() => {
      expect(screen.queryByLabelText("loader")).not.toBeInTheDocument();
      expect(submitBtn).not.toBeDisabled();
    });

<<<<<<< Updated upstream
    expect(screen.getByLabelText("Category Name *")).toHaveValue("");
    expect(screen.getByTestId("file-name").textContent).toBe("");

    expect(refetchSpy).toHaveBeenCalled();

    expect(clickSpy).toHaveBeenCalled();

    clickSpy.mockRestore();
  });

=======
    // Form should be reset (name cleared, file cleared)
    expect(screen.getByLabelText("Category Name *")).toHaveValue("");
    expect(screen.getByTestId("file-name").textContent).toBe("");

    // Hidden SheetClose should have been clicked programmatically
    expect(clickSpy).toHaveBeenCalled(); // programmatic .click()
    // And our visible SheetClose mock (Cancel) wasn't necessarily clicked
    // but trackable in case you need it:
    // expect(sheetCloseClickSpy).not.toHaveBeenCalled();

    clickSpy.mockRestore();
  });

>>>>>>> Stashed changes
  it("Cancel button is present and clickable (delegates to SheetClose)", async () => {
    render(<AddCategoryForm />);
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelBtn);
<<<<<<< Updated upstream
    expect(sheetCloseClickSpy).toHaveBeenCalledTimes(1);
  });
});
=======
    // Our mocked SheetClose increments this whenever clicked
    expect(sheetCloseClickSpy).toHaveBeenCalledTimes(1);
  });
});
>>>>>>> Stashed changes
