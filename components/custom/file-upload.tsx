"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { FormLabel } from "../ui/form";
import { FilePreview } from "./file-preview";

type Stage = "idle" | "processing" | "ready" | "error";

export const FileUpload = ({
  label,
  value,
  onChangeAction,
}: {
  label: string;
  value: File | undefined;
  onChangeAction: (file: File | undefined) => void;
}) => {
  const [isOver, setIsOver] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const readerRef = useRef<FileReader | null>(null);
  const dragDepth = useRef(0);

  const R = 18;
  const CIRC = useMemo(() => 2 * Math.PI * R, []);
  const progressOffset = CIRC - (progress / 100) * CIRC;

  // Helper function
  const revokePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const resetState = () => {
    setStage("idle");
    setProgress(0);
    setError(null);
    setFileSize(null);
    setFileName(null);
  };

  const clearInput = () => {
    if (inputRef.current) inputRef.current.value = "";
  };

  // Cleanup on unmount / when preview url changes
  useEffect(() => {
    return () => {
      revokePreview();
      readerRef.current?.abort();
    };
  }, []);

  // file processing
  const startLocalReadForPreview = (file: File) => {
    setStage("processing");
    setProgress(0);
    setError(null);

    readerRef.current?.abort();
    const reader = new FileReader();
    readerRef.current = reader;

    reader.onprogress = (e) => {
      if (!e.lengthComputable) return;
      setProgress(Math.round((e.loaded / e.total) * 100));
    };

    reader.onload = () => {
      // create a blob URL once processing is done (ties 100% to preview-ready)
      const url = URL.createObjectURL(file);
      setPreviewUrl((old) => {
        if (old) URL.revokeObjectURL(old);
        return url;
      });
      setFileSize(file.size);
      setStage("ready");
      setProgress(100);
      readerRef.current = null;
    };

    reader.onerror = () => {
      setError("Failed to read file locally.");
      setStage("error");
      readerRef.current = null;
    };

    reader.readAsArrayBuffer(file); // strongest progress events
  };

  const selectFile = (file: File | undefined) => {
    readerRef.current?.abort();
    revokePreview();
    resetState();

    onChangeAction(file);

    if (!file) {
      clearInput();
      return;
    }

    setFileName(file.name);
    startLocalReadForPreview(file);
  };

  const removeFile = () => {
    readerRef.current?.abort();
    revokePreview();
    resetState();
    onChangeAction(undefined);
    clearInput();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragDepth.current = 0;
    setIsOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) selectFile(file);
  };

  return (
    <div className="space-y-2">
      <FormLabel htmlFor={inputRef.current?.id}>{label}</FormLabel>

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dragDepth.current += 1;
          setIsOver(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dragDepth.current -= 1;
          if (dragDepth.current <= 0) {
            dragDepth.current = 0;
            setIsOver(false);
          }
        }}
        onDrop={onDrop}
        className={cn(
          "relative flex min-h-40 items-center justify-center gap-4 rounded-xl border border-dashed py-4 px-3 text-center transition-colors",
          isOver ? "border-blue-600 bg-blue-50" : "border-gray-300"
        )}
      >
        {stage === "error" ? (
          <div className="text-xs text-red-600">{error}</div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            {stage === "processing" ? (
              <>
                <div className="relative w-11 h-11">
                  <svg className="w-11 h-11 -rotate-90">
                    <circle
                      cx="22"
                      cy="22"
                      r={R}
                      stroke="#e5e7eb"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="22"
                      cy="22"
                      r={R}
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={CIRC}
                      strokeDashoffset={progressOffset}
                      className="text-brand-primary-text transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] text-[#0B0B0B]">
                      {progress}%
                    </span>
                  </div>
                </div>
                <p className="text-sm">Uploading</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={removeFile}
                  className="cursor-pointer border-brand-primary-text text-brand-primary-text font-medium text-sm tracking-normal"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                {/* icon */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <g clipPath="url(#clip0_1151_4917)">
                    <path
                      d="M25.4795 2.37793H10.7996V8.46558H28.6147V5.51196C28.6147 3.78369 27.2083 2.37793 25.4795 2.37793Z"
                      fill="#00708A"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M17.1697 9.4021H0V3.75342C0 1.68359 1.68433 0 3.75488 0H9.24463C9.79028 0 10.3159 0.11499 10.7935 0.331055C11.4604 0.631592 12.0334 1.12695 12.4353 1.77417L17.1697 9.4021Z"
                      fill="#006177"
                    />
                    <path
                      d="M32 10.667V28.8623C32 30.5928 30.5913 32.0002 28.8601 32.0002H3.13989C1.40869 32.0002 0 30.5928 0 28.8623V7.52832H28.8601C30.5913 7.52832 32 8.93628 32 10.667Z"
                      fill="#338DA1"
                    />
                    <path
                      d="M32 10.667V28.8623C32 30.5928 30.5913 32.0002 28.8601 32.0002H16V7.52832H28.8601C30.5913 7.52832 32 8.93628 32 10.667Z"
                      fill="#00708A"
                    />
                    <path
                      d="M24.4175 19.7632C24.4175 24.405 20.6414 28.1814 16 28.1814C11.3586 28.1814 7.58252 24.405 7.58252 19.7632C7.58252 15.1221 11.3586 11.3457 16 11.3457C20.6414 11.3457 24.4175 15.1221 24.4175 19.7632Z"
                      fill="#E7ECFC"
                    />
                    <path
                      d="M24.4175 19.7632C24.4175 24.405 20.6414 28.1814 16 28.1814V11.3457C20.6414 11.3457 24.4175 15.1221 24.4175 19.7632Z"
                      fill="#CED9F9"
                    />
                    <path
                      d="M18.713 19.8669C18.5375 20.0156 18.3224 20.0881 18.1093 20.0881C17.8424 20.0881 17.5773 19.9751 17.3918 19.7549L16.9374 19.2163V22.7424C16.9374 23.26 16.5175 23.6799 15.9999 23.6799C15.4823 23.6799 15.0624 23.26 15.0624 22.7424V19.2163L14.6081 19.7549C14.2736 20.1506 13.6825 20.2012 13.2868 19.8669C12.8913 19.5332 12.8405 18.9419 13.1742 18.5461L15.0299 16.3462C15.2719 16.0601 15.6249 15.8955 15.9999 15.8955C16.3749 15.8955 16.7279 16.0601 16.9699 16.3462L18.8256 18.5461C19.1593 18.9419 19.1086 19.5332 18.713 19.8669Z"
                      fill="#00708A"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M18.7131 19.8669C18.5376 20.0156 18.3225 20.0881 18.1094 20.0881C17.8425 20.0881 17.5774 19.9751 17.3918 19.7549L16.9375 19.2163V22.7424C16.9375 23.26 16.5176 23.6799 16 23.6799V15.8955C16.375 15.8955 16.728 16.0601 16.97 16.3462L18.8257 18.5461C19.1594 18.9419 19.1086 19.5332 18.7131 19.8669Z"
                      fill="#00708A"
                      fillOpacity="0.8"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1151_4917">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <p className="text-sm text-gray-text-strong/80">
                  Drag your file to start uploading
                </p>
                <div className="px-6 inline-flex justify-start items-center gap-2.5">
                  <div className="w-16 h-px relative bg-gray-stroke-weak" />
                  <div className="justify-center text-gray-text-weak text-sm">
                    OR
                  </div>
                  <div className="w-16 h-px relative bg-gray-stroke-weak" />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => inputRef.current?.click()}
                  className="cursor-pointer border-brand-primary-text text-brand-primary-text font-medium text-sm tracking-normal"
                >
                  Upload
                </Button>
              </>
            )}
          </div>
        )}

        {/* drag-over overlay */}
        {isOver && (
          <div className="pointer-events-none absolute rounded-[999px] w-[225px] h-[30px] py-1 px-2 bg-brand-primary-text flex items-center justify-center space-x-1">
            <svg
              width="13"
              height="16"
              viewBox="0 0 13 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.8125 4.6875C8.20941 4.6875 7.71875 4.19684 7.71875 3.59375V0H2.125C1.17728 0 0.40625 0.771031 0.40625 1.71875V14.2812C0.40625 15.229 1.17728 16 2.125 16H10.875C11.8227 16 12.5938 15.229 12.5938 14.2812V4.6875H8.8125ZM2.96875 11.25H5.24125C5.50012 11.25 5.71 11.4599 5.71 11.7188C5.71 11.9776 5.50012 12.1875 5.24125 12.1875H2.96875C2.70988 12.1875 2.5 11.9776 2.5 11.7188C2.5 11.4599 2.70988 11.25 2.96875 11.25ZM2.5 9.21875C2.5 8.95988 2.70988 8.75 2.96875 8.75H9.84375C10.1026 8.75 10.3125 8.95988 10.3125 9.21875C10.3125 9.47762 10.1026 9.6875 9.84375 9.6875H2.96875C2.70988 9.6875 2.5 9.47762 2.5 9.21875ZM9.84375 6.25C10.1026 6.25 10.3125 6.45988 10.3125 6.71875C10.3125 6.97762 10.1026 7.1875 9.84375 7.1875H2.96875C2.70988 7.1875 2.5 6.97762 2.5 6.71875C2.5 6.45988 2.70988 6.25 2.96875 6.25H9.84375Z"
                fill="white"
              />
            </svg>
            <span className="text-base-light-white text-sm">
              Drop your file to upload
            </span>
          </div>
        )}
      </div>

      {!value && (
        <p className="text-xs text-gray-400">
          Only supports .jpg, .png, .jpeg files (≤ 1 MB)
        </p>
      )}

      {value && previewUrl && fileName && fileSize && (
        <FilePreview
          url={previewUrl}
          size={fileSize}
          name={fileName}
          onRemove={removeFile}
        />
      )}

      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/jpeg,image/png,.jpg,.jpeg,.png"
        multiple={false}
        onChange={(e) => selectFile(e.target.files?.[0])}
      />
    </div>
  );
};
