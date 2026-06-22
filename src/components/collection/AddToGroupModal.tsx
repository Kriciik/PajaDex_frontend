import { Check, X } from "lucide-react";

interface AddToGroupModalProps {
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  isPending: boolean;
}
export default function AddToGroupModal({
  onSave,
  onCancel,
  onDelete,
  isPending,
}: AddToGroupModalProps) {
  return (
    <div className="fixed right-15 bottom-10 z-3 flex h-30 w-50 flex-col items-center justify-center gap-2 rounded-xl border bg-white/30 backdrop-blur-3xl backdrop-invert backdrop-opacity-95">
      <div className="flex gap-10">
        <button
          onClick={onSave}
          disabled={isPending}
          title="Save changes"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 transition-all hover:scale-105 hover:cursor-pointer active:scale-95"
        >
          <Check color="white" />
        </button>
        <button
          onClick={onCancel}
          title="Cancel changes"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 transition-all hover:scale-105 hover:cursor-pointer active:scale-95"
        >
          <X color="white" />
        </button>
      </div>

      <button
        className="font-bold text-red-700 hover:cursor-pointer"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
}
