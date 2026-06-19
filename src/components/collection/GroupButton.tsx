export default function FilterGroupButton({ group }: { group: Array<object> }) {
  return (
    <button
      className={`max-h-15 max-w-50 rounded-md ${group.color} px-9 py-3 transition-all hover:scale-[1.04] active:scale-95`}
    >
      {group.name}
    </button>
  );
}
