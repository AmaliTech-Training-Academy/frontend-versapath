const isFile = (v: unknown): v is File =>
    typeof File !== "undefined" && v instanceof File;
const isBlob = (v: unknown): v is Blob =>
    typeof Blob !== "undefined" && v instanceof Blob;

export function toFormData(data: Record<string, unknown>, fd = new FormData(), prefix?: string): FormData {
    Object.entries(data).forEach(([key, value]) => {
        if (value == null) return;
        const name = prefix ? `${prefix}[${key}]` : key;

        if (isFile(value) || isBlob(value)) {
            fd.append(name, value);
        } else if (typeof value === "object") {
            toFormData(value as Record<string, unknown>, fd, name);
        } else {
            fd.append(name, String(value));
        }
    });

    return fd;
}
