import type { Group } from "../../types/group.types";

interface GroupI {
  group: Group;
  isEditing: boolean;
  isActiveFilter: boolean;
  onFilterSelect: (groupId: string) => void;
  onStartEdit: (groupId: string) => void;
}
export default function FilterGroupButton({
  group,
  isEditing,
  isActiveFilter,
  onFilterSelect,
  onStartEdit,
}: GroupI) {
  const backgroundColor = group.color ? `#${group.color}` : "#fb64b6 ";

  return (
    <div>
      <button
        onClick={() => {
          onFilterSelect(group.id);
        }}
        className={`max-h-15 max-w-50 cursor-pointer rounded-md px-9 py-3 transition-all hover:scale-[1.04] active:scale-95`}
        style={{ backgroundColor: backgroundColor }}
      >
        {group.name}
      </button>
      {isActiveFilter && !isEditing && (
        <button
          className="ml-3"
          onClick={() => {
            onStartEdit(group.id);
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
}
