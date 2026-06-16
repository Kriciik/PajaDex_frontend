export default function FilterGroupButton({ group }: { group: string }) {
  return (
    <button className="max-h-15 max-w-50 rounded-md bg-amber-500 px-9 py-3">
      {group}
    </button>
  );
}
