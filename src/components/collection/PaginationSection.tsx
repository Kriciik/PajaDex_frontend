import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

export default function PaginationSection({
  onPageChange,
  startIndex,
  endIndex,
  totalItems,
}: {
  onPageChange: (step: number) => void;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  totalPages: number;
}) {
  return (
    <div className="flex w-70 flex-row items-center justify-between gap-2">
      <button
        className={`cursor-pointer border-black px-4 py-1 font-bold ${startIndex === 1 ? "invisible" : ""}`}
        onClick={() => {
          onPageChange(-1);
        }}
      >
        <ArrowBigLeft
          color="oklch(65.6% 0.241 354.308)"
          fill="oklch(65.6% 0.241 354.308)"
        />
      </button>

      <span>
        {startIndex} - {endIndex}
      </span>
      <span>...</span>
      <span>{totalItems}</span>
      <button
        className={`cursor-pointer rounded px-4 py-1 font-bold ${endIndex === totalItems ? "hidden" : ""}`}
        onClick={() => {
          onPageChange(1);
        }}
      >
        <ArrowBigRight
          color="oklch(65.6% 0.241 354.308)"
          fill="oklch(65.6% 0.241 354.308)"
        />
      </button>
    </div>
  );
}
