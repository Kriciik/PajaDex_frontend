import { useEffect, useState } from "react";
import BaseCard from "../components/collection/BaseCard";
import GroupSection from "../components/collection/GroupSection";
import Navigation from "../components/collection/Navigation";
import PaginationSection from "../components/collection/PaginationSection";
import SearchAndFilterSection from "../components/collection/SearchAndFilterSection";
import {
  useDetailedPokemonData,
  usePokemonData,
} from "../utils/pokemonApi.utils";
import DetailedPokeModal from "../components/collection/modal/DetailedPokeModal";
import AddToGroupModal from "../components/collection/AddToGroupModal";

// TODO: bude dynamicky, zatím hardcoded
const LIMIT = 20;

// TODO: skupiny budou v databázi, takže je bude možné dynamicky načítat a měnit. Prozatím jsou hardcoded
const groups: Array<object> = [
  { name: "cute", color: "bg-pink-400" },
  { name: "cool", color: "bg-fuchsia-300" },
  { name: "hajzli", color: "bg-blue-400" },
  { name: "legendary", color: "bg-blue-200" },
  { name: "strong", color: "bg-white" },
  { name: "weak", color: "bg-pink-100" },
];

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [canAddToGroup, setCanAddToGroup] = useState(true);
  const debouncedSearch = useDebounce(search, 500);
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = usePokemonData(currentPage, LIMIT, debouncedSearch);

  const { data: detailedResponse, isLoading: isDetailedLoading } =
    useDetailedPokemonData(selectedId);

  const pokemonArr = response?.data || [];
  const detailedPokemonData = detailedResponse;
  const totalPages = response?.meta.totalPages || 1;
  const totalItems = response?.meta.totalItems || 0;

  const pageStartIndex = totalItems === 0 ? 0 : (currentPage - 1) * LIMIT + 1;
  const pageEndIndex = Math.min(currentPage * LIMIT, totalItems);

  const currentIndex = pokemonArr.findIndex(
    (pokemon) => pokemon?.id === selectedId,
  );

  const hasPrev = currentIndex > 0; // TODO: možná null
  const hasNext = currentIndex < pokemonArr.length - 1 && currentIndex !== -1;

  // TODO: refaktor na jednu funkci, která bude brát step
  const handlePrev = hasPrev
    ? () => {
        setSelectedId(pokemonArr[currentIndex - 1].id);
      }
    : undefined;
  const handleNext = hasNext
    ? () => {
        setSelectedId(pokemonArr[currentIndex + 1].id);
      }
    : undefined;

  async function handlePageChange(step: number) {
    const nextPage = currentPage + step;
    if (nextPage < 1) return;
    if (nextPage > totalPages) return;

    setCurrentPage(nextPage);
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="w-ful flex min-h-screen font-medium">
        <Navigation />
        <main className="z-3 flex w-full flex-col gap-5 bg-pink-300 p-15 shadow-2xl">
          <GroupSection groups={groups} />
          <div className="flex w-full flex-col gap-3 text-white">
            <SearchAndFilterSection
              value={search}
              setSearch={setSearch}
              setCurrentPage={setCurrentPage}
            />
            <PaginationSection
              onPageChange={handlePageChange}
              startIndex={pageStartIndex}
              endIndex={pageEndIndex}
              totalItems={totalItems}
              totalPages={totalPages}
            />
            <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
              {pokemonArr.map((pokemon, index) => {
                if (!pokemon) return null;
                return (
                  <BaseCard
                    card={pokemon}
                    key={index}
                    onImageClicked={() => setSelectedId(pokemon.id)}
                    canAddToGroup={canAddToGroup}
                  />
                );
              })}
            </div>
          </div>
        </main>
      </div>
      {selectedId && (
        <DetailedPokeModal
          isLoading={isDetailedLoading}
          pokemonData={detailedPokemonData}
          onClose={() => setSelectedId(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
      {canAddToGroup && <AddToGroupModal />}
    </>
  );
}
