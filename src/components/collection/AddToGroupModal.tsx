import { Check, X } from "lucide-react";

interface AddToGroupModalProps {
  onSave: () => void;
  onCancel: () => void;
  isPending: boolean;
}
export default function AddToGroupModal({
  onSave,
  onCancel,
  isPending,
}: AddToGroupModalProps) {
  return (
    <div className="fixed right-15 bottom-10 z-3 flex h-30 w-50 flex-row items-center justify-center gap-10 rounded-xl border bg-white/30 backdrop-blur-3xl backdrop-invert backdrop-opacity-95">
      <button
        onClick={onSave}
        disabled={isPending}
        title="Save changes"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 transition-all hover:scale-105 active:scale-95"
      >
        <Check color="white" />
      </button>
      <button
        onClick={onCancel}
        title="Cancel changes"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500"
      >
        <X color="white" />
      </button>
    </div>
  );
}
