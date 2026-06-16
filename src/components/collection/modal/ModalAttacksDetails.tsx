import ModalItem from "./ModalItem";

export default function ModalAttacksDetails({ damage }: { damage: number }) {
  return (
    <div className="flex flex-row items-center justify-between">
      <ModalItem
        label="Poison gas"
        value="Popis tohoto útoku je moc hustý dsadasdasd sd sad sa das
                        dasd as dsadsa"
        isAttack={true}
      />
      <span className="text-[1.3rem]">{damage}</span>
    </div>
  );
}
