import ModalItem from "./ModalItem";
import ModalArrow from "./ModalArrow";
import type { DetailedCard } from "../../../types/card.types";

interface detailedPokeModalProps {
  pokemonData: DetailedCard | undefined;
  isLoading: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}
export default function DetailedPokeModal({
  pokemonData,
  isLoading,
  onClose,
  onPrev,
  onNext,
}: detailedPokeModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (isLoading || !pokemonData) return <div>Loading...</div>;
  if (!pokemonData) return <div>No data found</div>;
  return (
    <div
      className="fixed top-0 z-50 flex h-full w-full flex-row items-center justify-between bg-[rgba(0,0,0,0.5)] text-pink-600"
      onClick={handleBackdropClick}
    >
      <ModalArrow text="ArrowLeft" onClick={onPrev} disabled={!onPrev} />
      {/* overflow-y možná oddělat*/}
      <div className="h-max-[70vh] flex h-auto min-h-120 w-full max-w-200 flex-col items-center gap-3 overflow-y-auto rounded bg-fuchsia-200 px-5 pt-5 pb-10">
        <div className="flex flex-row items-baseline gap-3">
          <h1 className="text-4xl">{pokemonData.name}</h1>
          <h3 className="text-xl text-gray-700">#{pokemonData.id}</h3>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <img
            src={pokemonData.image}
            alt={`Pokemon ${pokemonData.name} with id ${pokemonData.id}`}
            className="aspect-2.5/3.5 w-full max-w-150 justify-self-end"
          />
          <div className="flex flex-col gap-2">
            <ModalItem label="set name" value={pokemonData.setName} />
            <hr className="my-1 w-[85%] border-t border-gray-500" />
            <ModalItem label="type" value={pokemonData.type} />
            <hr className="my-1 w-[85%] border-t border-gray-500" />

            <div>
              <h3 className="text-[1rem] font-light text-fuchsia-500">
                attacks
              </h3>
              {pokemonData.abilities.map((ability, index) => (
                <div
                  className="flex flex-row items-center justify-between"
                  key={index}
                >
                  <ModalItem
                    label={ability.name}
                    value={ability.effect || ""}
                    isAttack={true}
                  />
                  <span className="text-[1.3rem]">{ability.damage}</span>
                </div>
              ))}

              <hr className="my-2 w-[85%] border-t border-gray-500" />
              <ModalItem label="description" value={pokemonData.description} />
              <ModalItem label="Illustrator" value={pokemonData.illustrator} />
            </div>
          </div>
        </div>
      </div>
      <ModalArrow text="ArrowRight" onClick={onNext} disabled={!onNext} />
    </div>
  );
}
