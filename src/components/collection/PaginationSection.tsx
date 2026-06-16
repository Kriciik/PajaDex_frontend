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
}) {
  return (
    <div className="flex flex-row items-center gap-2">
      <button
        className="rounded border-2 border-black px-4 py-1 font-bold"
        onClick={() => {
          onPageChange(-1);
        }}
      >
        &lt;
      </button>
      <span>
        {startIndex} - {endIndex}
      </span>
      <span>...</span>
      <span>{totalItems}</span>
      <button
        className="rounded border-2 border-black px-4 py-1 font-bold"
        onClick={() => {
          onPageChange(1);
        }}
      >
        &gt;
      </button>
    </div>
  );
}
