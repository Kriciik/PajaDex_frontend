interface ModalArrowProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ModalArrow({
  text,
  onClick,
  disabled,
}: ModalArrowProps) {
  return (
    <button
      className={`mx-7 bg-amber-200 ${disabled ? "invisible" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
