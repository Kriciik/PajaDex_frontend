import { Star } from "lucide-react";
import type { CleanCard } from "../../types/card.types";
import { useToggleCardInCollection } from "../../utils/pokemonApi.utils";
export default function BaseCard({
  card,
  onImageClicked,
  canAddToGroup,
}: {
  card: CleanCard;
  onImageClicked: () => void;
  canAddToGroup: boolean;
}) {
  const { id, name, image, isOwned } = card;
  const mutation = useToggleCardInCollection();
  function handleOwnedToggle() {
    mutation.mutate(card);
  }
  return (
    <div className="relative aspect-2.5/3.5 w-full transition-all hover:scale-[1.03]">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        ) : (
          /* Ikona plus / prázdné */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        )}
        <button
          className="absolute right-12 bottom-3 h-3 w-3"
          disabled={canAddToGroup}
        >
          {canAddToGroup ? (
            <Star color="yellow" />
          ) : (
            <Star color="yellow" className="text-yellow-200" />
          )}
        </button>
      </button>
    </div>
  );
}
