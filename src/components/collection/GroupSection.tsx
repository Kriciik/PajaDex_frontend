import { Plus } from "lucide-react";
import FilterGroupButton from "./GroupButton";

export default function GroupSection({ groups }: { groups: Array<object> }) {
  return (
    <div className="flex min-h-30 w-full flex-col rounded bg-pink-200 pb-4 shadow-md">
      <h1 className="self-center text-3xl">Groups</h1>
      <div className="flex h-full w-full flex-wrap items-center gap-5 pl-10">
        {groups.map((group, index) => {
          return <FilterGroupButton group={group} key={index} />;
        })}
        <button className="flex h-8 w-8 content-center items-center justify-center rounded-full bg-pink-500 p-1 text-sm shadow-md transition-all hover:scale-105 active:scale-95">
          <Plus color="black" />
        </button>
      </div>
    </div>
  );
}
