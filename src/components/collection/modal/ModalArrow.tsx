import { StepBack, StepForward } from "lucide-react";

interface ModalArrowProps {
  side: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
}

export default function ModalArrow({
  side,
  onClick,
  disabled,
}: ModalArrowProps) {
  return (
    <button
      className={`mx-7 ${disabled ? "invisible" : ""} transition-all hover:scale-110 active:scale-95`}
      onClick={onClick}
      disabled={disabled}
    >
      {side === "left" ? (
        <StepBack fill="white" color="pink" size={60} />
      ) : (
        <StepForward fill="white" color="pink" size={60} />
      )}
    </button>
  );
}
