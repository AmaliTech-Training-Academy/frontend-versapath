// AddCategoryForm.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ---- Global JSDOM niceties
// Some libs call matchMedia; keep it quiet.
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

// ---- Mocks for external deps so tests stay focused on logic

// 1) Mock the Zod schema module to require "name"
vi.mock("@/lib/schemas/add-category", () => {
    return {
        addCategorySchema: {
            // react-hook-form + zodResolver will just call this
            // We emulate a minimal parse() shape like zod would do.
            // If name is empty-ish, throw; else succeed.
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

// 2) Mock sonner toast
const toastSuccess = vi.fn();
vi.mock("sonner", () => ({
    toast: { success: (...args: any[]) => toastSuccess(...args) },
}));

// 3) Mock shadcn/ui <Form> and <FormField> with simple passthroughs
vi.mock("@/components/ui/form", () => {
    return {
        Form: ({ children }: any) => <>{children}</>,
        FormField: ({ render, name, control }: any) =>
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
    Button: ({ children, ...props }: any) => (
        <button {...props}>{children}</button>
    ),
}));

// 5) Mock CustomInput to a simple input with label
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

// 6) Mock FileUpload to a basic file input
vi.mock("@/components/custom/file-upload", () => ({
    FileUpload: ({ label, value, onChangeAction }: any) => (
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

// 7) Mock SheetClose; we especially need the forwarded ref to test programmatic click()
const sheetCloseClickSpy = vi.fn();
vi.mock("@/components/ui/sheet", async () => {
    const React = await import("react");

    const SheetClose = React.forwardRef<HTMLButtonElement, any>(
        ({ asChild, children, onClick, ...rest }, ref) => {
            const handleClick = (e: any) => {
                sheetCloseClickSpy();
                onClick?.(e);
            };

            // If asChild, inject our click handler into the child instead of wrapping it
            if (asChild && React.isValidElement(children)) {
                const child = children as React.ReactElement<any>;
                return React.cloneElement(child, {
                    ...rest,
                    // call child's onClick first so user handlers run before ours (or flip if you prefer)
                    onClick: (...args: any[]) => {
                        child.props?.onClick?.(...args);
                        handleClick(args[0]);
                    },
                    ref, // will be ignored if child isn't ref-forwarding, which is fine for the visible Cancel
                });
            }

            // Non-asChild (e.g., the hidden programmatic close button)
            return <button ref={ref} onClick={handleClick} {...rest} />;
        }
    );

    SheetClose.displayName = "SheetClose";
    return { SheetClose };
});

// 8) Mock lucide-react Loader with a simple marker
vi.mock("lucide-react", () => ({
    Loader: (props: any) => <svg aria-label="loader" {...props} />,
}));

// 9) IMPORTANT: Mock the zodResolver to call our mocked schema.parse
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

// ---- Import the component after mocks
import { AddCategoryForm } from "@/app/dashboard/skill-categories/components/add-category-form";

// Helpers
const typeInto = async (label: string, text: string) => {
    const input = await screen.findByLabelText(label);
    await userEvent.clear(input);
    await userEvent.type(input, text);
    return input;
};

describe("<AddCategoryForm />", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        toastSuccess.mockClear();
        sheetCloseClickSpy.mockClear();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("renders required fields", () => {
        render(<AddCategoryForm />);
        expect(screen.getByLabelText("Category Name *")).toBeInTheDocument();
        expect(screen.getByLabelText("Description")).toBeInTheDocument();
        expect(screen.getByLabelText("Cover")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /add category/i })).toBeInTheDocument();
    });

    it("does not submit when name is empty (zod validation) and does not toast", async () => {
        render(<AddCategoryForm />);
        await userEvent.click(screen.getByRole("button", { name: /add category/i }));
        // since schema rejects, submit handler shouldn't run
        expect(toastSuccess).not.toHaveBeenCalled();
    });

    it("shows loader while submitting, then fires toast, resets, and triggers SheetClose programmatically", async () => {
        // Spy on the programmatic click() used on the hidden SheetClose
        const clickSpy = vi.spyOn(HTMLButtonElement.prototype, "click");

        render(<AddCategoryForm />);

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
        await waitFor(() => {
            expect(screen.queryByLabelText("loader")).not.toBeInTheDocument();
            expect(submitBtn).not.toBeDisabled();
        });

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

    it("Cancel button is present and clickable (delegates to SheetClose)", async () => {
        render(<AddCategoryForm />);
        const cancelBtn = screen.getByRole("button", { name: /cancel/i });
        await userEvent.click(cancelBtn);
        // Our mocked SheetClose increments this whenever clicked
        expect(sheetCloseClickSpy).toHaveBeenCalledTimes(1);
    });
});