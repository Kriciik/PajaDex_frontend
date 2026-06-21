interface SearchAndFilterSectionProps {
  value: string;
  setSearch: (value: string) => void;
  setCurrentPage: (page: number) => void;
  showOwnedOnly: boolean; // Nová prop
  onShowOwnedChange: (checked: boolean) => void; // Nová prop
  isEditing: boolean; // Nová prop
}
export default function SearchAndFilterSection({
  value,
  setSearch,
  setCurrentPage,
  showOwnedOnly,
  onShowOwnedChange,
  isEditing,
}: SearchAndFilterSectionProps) {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex items-center justify-center gap-3">
        <label htmlFor="showOwnedInput">Show owned</label>
        <input
          type="checkbox"
          id="showOwnedInput"
          className="size-4"
          checked={showOwnedOnly}
          disabled={isEditing}
          onChange={(e) => onShowOwnedChange(e.target.checked)}
        />
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
