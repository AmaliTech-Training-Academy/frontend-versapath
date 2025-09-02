import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

export const Pagination: React.FC<{
  handlePaginationBtnClick: (page: number) => void;
  handleNext: () => void;
  handlePrev: () => void;
  nextDisabled: boolean;
  prevDisabled?: boolean;
  activePage: number;
  totalPages: number;
}> = ({
  handlePaginationBtnClick,
  handleNext,
  handlePrev,
  nextDisabled,
  prevDisabled,
  activePage,
  totalPages,
}) => {
  const pageNumbers = React.useMemo(() => {
    const windowSize = 3; // how many pages to show at once
    let start = Math.max(1, activePage - 1);
    const end = Math.min(totalPages, start + windowSize - 1);

    // shift window if we’re at the end
    if (end - start < windowSize - 1) {
      start = Math.max(1, end - windowSize + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [activePage, totalPages]);


  return (
    <div className="flex items-center justify-center overflow-hidden border rounded-lg w-fit">
      <button
        className="grid w-10 h-10 transition-all place-content-center hover:bg-base-light-overlay/50 disabled:opacity-20 disabled:cursor-not-allowed"
        onClick={handlePrev}
        disabled={prevDisabled}
      >
        <ChevronLeft />
      </button>

      {/* Always show first page */}
      {pageNumbers[0] > 1 && (
        <>
          <button
            className={cn(
              "grid w-10 h-10 p-2 text-base transition-all border-s aspect-square place-content-center hover:bg-base-light-overlay/50",
              activePage === 1 && "bg-base-light-overlay"
            )}
            onClick={() => handlePaginationBtnClick(0)}
          >
            1
          </button>
          {pageNumbers[0] > 2 && (
            <span className="grid w-10 h-10 p-2 text-base border-s aspect-square place-content-center">
              …
            </span>
          )}
        </>
      )}

      {/* Middle numbers */}
      {pageNumbers.map((val) => (
        <button
          key={val}
          className={cn(
            "grid w-10 h-10 p-2 text-base transition-all border-s aspect-square place-content-center hover:bg-base-light-overlay/50",
            activePage === val && "bg-base-light-overlay"
          )}
          onClick={() => handlePaginationBtnClick(val - 1)}
        >
          {val}
        </button>
      ))}

      {/* Always show last page */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="grid w-10 h-10 p-2 text-base border-s aspect-square place-content-center">
              …
            </span>
          )}
          <button
            className={cn(
              "grid w-10 h-10 p-2 text-base transition-all border-s aspect-square place-content-center hover:bg-base-light-overlay/50",
              activePage === totalPages && "bg-base-light-overlay"
            )}
            onClick={() => handlePaginationBtnClick(totalPages - 1)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className="grid w-10 h-10 transition-all border-s place-content-center hover:bg-base-light-overlay/50 disabled:opacity-20 disabled:cursor-not-allowed"
        onClick={handleNext}
        disabled={nextDisabled}
      >
        <ChevronRight />
      </button>
    </div>
  );
};
