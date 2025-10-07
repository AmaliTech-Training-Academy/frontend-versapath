


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

const toastSuccess = vi.fn();
vi.mock("sonner", () => ({
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
}));

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
    const handleClick = (e: unknown) => {
      sheetCloseClickSpy();

      return <button ref={ref} onClick={handleClick} {...rest} />;
    }
  });

  SheetClose.displayName = "SheetClose";
  return { SheetClose };
});

vi.mock("lucide-react", () => ({
  Loader: (props: Record<string, unknown>) => (
    <svg aria-label="loader" {...props} />
  ),
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
    vi.useFakeTimers();
    toastSuccess.mockClear();
    sheetCloseClickSpy.mockClear();
    revalidateSpy.mockClear();
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
    expect(toastSuccess).not.toHaveBeenCalled();
    expect(revalidateSpy).not.toHaveBeenCalled();
  });

  it("shows loader while submitting, then toasts, resets, calls revalidateAction, and triggers SheetClose programmatically", async () => {
    const clickSpy = vi.spyOn(HTMLButtonElement.prototype, "click");

    render(<AddCategoryForm revalidateAction={revalidateSpy} />);

    // fill the required "name"
    await typeInto("Category Name *", "Data Science");

    // Attach a fake file
    const file = new File(["dummy"], "cover.png", { type: "image/png" });
    const fileInput = screen.getByLabelText("Cover");
    await userEvent.upload(fileInput, file);
    expect(screen.getByTestId("file-name").textContent).toBe("cover.png");

    // Submit
    const submitBtn = screen.getByRole("button", { name: /add category/i });
    expect(submitBtn).not.toBeDisabled();
    await userEvent.click(submitBtn);

    // Loader should be visible during submit
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
    // Our mocked SheetClose increments this whenever clicked
    expect(sheetCloseClickSpy).toHaveBeenCalledTimes(1);
  });
});

