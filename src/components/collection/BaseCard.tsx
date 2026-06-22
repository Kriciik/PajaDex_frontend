import { Check, Plus, Star } from "lucide-react";
import type { CleanCard } from "../../types/card.types";
import { useToggleCardInCollection } from "../../api/pokemon.api";

interface BaseCardProps {
  card: CleanCard;
  onImageClicked: () => void;
  isEditMode: boolean;
  isGroupMember: boolean;
  onToggleGroup: () => void;
}
export default function BaseCard({
  card,
  onImageClicked,
  isEditMode,
  isGroupMember,
  onToggleGroup,
}: BaseCardProps) {
  const { id, name, image, isOwned } = card;
  const mutation = useToggleCardInCollection();

  function handleOwnedToggle() {
    mutation.mutate(card);
  }

  return (
    <div className="relative aspect-2.5/3.5 w-full cursor-pointer transition-all hover:scale-[1.03]">
      <img
        key={id}
        id={id}
        src={image}
        alt={`Pokemon ${name} with id ${id}`}
        className={`${isOwned ? "" : "opacity-70"} h-full w-full rounded object-contain`}
        onClick={onImageClicked}
      />
      <button
        className="absolute right-5 bottom-5 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-pink-700 shadow-md transition-all active:scale-80"
        onClick={handleOwnedToggle}
        disabled={mutation.isPending}
      >
        {isOwned ? (
          /* Ikona fajfky */
          <Check />
        ) : (
          /* Ikona plus / prázdné */
          <Plus />
        )}
      </button>
      {isEditMode && (
        <button
          className="absolute right-18 bottom-9 h-3 w-3"
          onClick={onToggleGroup}
        >
          <Star
            color="black"
            size={25}
            fill={isGroupMember ? "black" : "none"}
          />
        </button>
      )}
    </div>
  );
}
