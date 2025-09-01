import Image from "next/image";
import { Button } from "../ui/button";
import { CircleX } from "lucide-react";

export const FilePreview = ({ url, size, name, onRemove }: { url: string, size: number; name: string; onRemove: () => void }) => {
    function formatFileSize(bytes: number): string {
        if (bytes < 1024) return `${bytes}b`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}kb`;
        return `${(bytes / (1024 * 1024)).toFixed(1)}mb`;
    }

    return (
        <div className="p-4 rounded-[12px] border border-text-gray flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
                <Image src={url} alt="File preview" width={36} height={36} />
                <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-gray-text-weak">{formatFileSize(size)}</p>
                </div>
            </div>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="cursor-pointer"
                onClick={onRemove}
                aria-label="Remove file"
            >
                <CircleX className="w-5 h-5" color="#858585" />
            </Button>
        </div>
    );
};