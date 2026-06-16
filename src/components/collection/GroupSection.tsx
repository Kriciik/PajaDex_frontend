import FilterGroupButton from "./GroupButton";

export default function GroupSection({ groups }: { groups: Array<string> }) {
  return (
    <div className="flex min-h-30 w-full flex-col rounded bg-gray-100 pb-4 shadow-md">
      <h1 className="self-center text-3xl">Groups</h1>
      <div className="flex h-full w-full flex-wrap items-center gap-5 pl-10">
        {groups.map((group, index) => {
          return <FilterGroupButton group={group} key={index} />;
        })}
        <button className="h-7 w-7 content-center rounded-full bg-gray-600 p-1 text-center text-sm">
          +
        </button>
      </div>
    </div>
  );
}
