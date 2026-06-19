export default function ModalItem({
  label,
  value,
  isAttack = false,
}: {
  label: string;
  value: string | string[];
  isAttack?: boolean;
}) {
  if (Array.isArray(value)) {
    value = value.join(", ");
  }
  if (isAttack) {
    return (
      <div>
        <h1 className="text-[1.4rem]">{label}</h1>
        <h3 className="text-[1rem] font-light text-fuchsia-500">{value}</h3>
      </div>
    );
  }
  return (
    <div>
      <h3 className="text-[1rem] font-light text-fuchsia-500">{label}</h3>
      <h1 className="text-[1.3rem]">{value}</h1>
    </div>
  );
}
