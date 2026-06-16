import { useState } from "react";
export default function BaseCard({
  index,
  url,
  name,
  OnImageClicked,
}: {
  index: string;
  url: string;
  name: string;

  OnImageClicked: (e: React.MouseEvent) => void;
}) {
  const [isOwned, setIsOwned] = useState(false);

  function handleOwnedToggle() {
    // TODO: logika pro přidávání/odebírání podle IDčka, ne jen přepínání stavu
    setIsOwned((prev) => !prev);
  }
  return (
    <div className="relative aspect-2.5/3.5 w-full">
      <img
        key={index}
        id={index}
        src={url}
        alt={`Pokemon ${name} with id ${index}`}
        className={`${isOwned ? "" : "opacity-70"} h-full w-full rounded object-contain`}
        onClick={(e: React.MouseEvent) => {
          OnImageClicked(e);
        }}
      />
      <button
        className="absolute right-5 bottom-5 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-pink-700 shadow-md transition-all active:scale-80"
        onClick={handleOwnedToggle}
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
      </button>
    </div>
  );
}
