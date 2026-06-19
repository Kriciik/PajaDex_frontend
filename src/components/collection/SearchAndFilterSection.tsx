interface SearchAndFilterSectionProps {
  value: string;
  setSearch: (value: string) => void;
  setCurrentPage: (page: number) => void;
}
export default function SearchAndFilterSection({
  value,
  setSearch,
  setCurrentPage,
}: SearchAndFilterSectionProps) {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex items-center justify-center gap-3">
        <label htmlFor="showOwnedInput">Show owned</label>
        <input type="checkbox" name="" id="showOwnedInput" className="size-4" />
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          name="searchInput"
          id="card-search"
          placeholder="Pikachu"
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="rounded bg-white text-[1.3rem] text-black"
        />
      </div>
    </div>
  );
}
