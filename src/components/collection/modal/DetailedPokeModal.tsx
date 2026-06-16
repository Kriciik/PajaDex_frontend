import { useState } from "react";
import ModalItem from "./ModalItem";
import ModalArrow from "./ModalArrow";
import ModalAttacksDetails from "./ModalAttacksDetails";

export default function DetailedPokeModal({
  handleModalOpen,
}: {
  handleModalOpen: (e: React.MouseEvent) => void;
}) {
  //TODO: možná přidat props

  return (
    <div
      className="fixed top-0 z-50 flex h-full w-full flex-row items-center justify-between bg-[rgba(0,0,0,0.5)] text-pink-600"
      onClick={(e) => {
        handleModalOpen(e);
      }}
    >
      <ModalArrow text="ArrowLeft" />
      {/* overflow-y možná oddělat*/}
      <div className="h-max-[70vh] flex h-auto min-h-120 w-full max-w-200 flex-col items-center gap-3 overflow-y-auto rounded bg-fuchsia-200 px-5 pt-5 pb-10">
        <div className="flex flex-row items-baseline gap-3">
          <h1 className="text-4xl">Name</h1>
          <h3 className="text-xl text-gray-700">#swhs-3</h3>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <img
            src="https://assets.tcgdex.net/en/swsh/swsh1/65/high.webp"
            alt="Pokemon image  name"
            className="aspect-2.5/3.5 w-full max-w-150 justify-self-end"
          />
          <div className="flex flex-col gap-2">
            {/* TODO: Dát realný data */}

            <ModalItem label="set name" value="Sword And Shield" />
            <hr className="my-1 w-[85%] border-t border-gray-500" />
            <ModalItem label="type" value="Fire, Water" />
            <hr className="my-1 w-[85%] border-t border-gray-500" />

            <div>
              <h3 className="text-[1rem] font-light text-fuchsia-500">
                attacks
              </h3>
              <ModalAttacksDetails damage={90} />
              <ModalAttacksDetails damage={50} />
              <hr className="my-2 w-[85%] border-t border-gray-500" />
              <ModalItem
                label="description"
                value="Popis tohoto hustýho pokémona. často bydlí v lese a nemá
                  peníze."
              />
              <ModalItem label="Ilustrátor" value="Jméno autora, frajer" />
            </div>
          </div>
        </div>
      </div>
      <ModalArrow text="ArrowRight" />
    </div>
  );
}
