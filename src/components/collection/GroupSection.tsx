import { Check, Plus, X } from "lucide-react";
import FilterGroupButton from "./FilterGroupButton";
import { useState } from "react";
import type { Group } from "../../types/group.types";

interface GroupI {
  groups: Array<Group>;
  onAddGroup: (name: string) => void;
  activeFilterGroupId: string | null;
  onFilterSelect: (groupId: string) => void;
  editingGroupId: string | null;
  onStartEdit: (groupId: string) => void;
}
export default function GroupSection({
  groups,
  onAddGroup,
  activeFilterGroupId,
  onFilterSelect,
  editingGroupId,
  onStartEdit,
}: GroupI) {
  const [inputValue, setInputValue] = useState("");
  const [isInEditMode, setisInEditMode] = useState(true);

  const handleConfirm = () => {
    if (!inputValue.trim()) return;
    onAddGroup(inputValue);
    setInputValue("");
    setisInEditMode(!isInEditMode);
  };

  const handleCancel = () => {
    setInputValue("");
    setisInEditMode(!isInEditMode);
  };
  return (
    <div className="flex min-h-30 w-full flex-col rounded bg-pink-200 pb-4 shadow-md">
      <h1 className="self-center text-3xl">Groups</h1>
      <div className="flex h-full w-full flex-wrap items-center gap-5 pl-10">
        {groups.map((group, index) => {
          return (
            <FilterGroupButton
              group={group}
              key={group.id}
              isActiveFilter={activeFilterGroupId === group.id}
              isEditing={editingGroupId === group.id}
              onFilterSelect={onFilterSelect}
              onStartEdit={onStartEdit}
            />
          );
        })}
        {isInEditMode ? (
          <button
            className={`"h-8 flex w-8 content-center items-center justify-center rounded-full bg-pink-500 p-1 text-sm shadow-md transition-all hover:scale-105 active:scale-95`}
            onClick={() => setisInEditMode(!isInEditMode)}
          >
            <Plus color="white" />
          </button>
        ) : (
          <div className="flex h-auto content-center items-center justify-center gap-1 rounded-full bg-white p-2 text-sm shadow-md transition-all">
            <input
              type="text"
              className="rounded-2xl text-[1.2rem]"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <Check
              color="green "
              className="hover:scale-105"
              onClick={handleConfirm}
            />
            <X
              color="red "
              className="hover:scale-105"
              onClick={handleCancel}
            />
          </div>
        )}
      </div>
    </div>
  );
}
