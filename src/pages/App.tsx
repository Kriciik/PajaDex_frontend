import { useState } from "react";
import BaseCard from "../components/collection/BaseCard";
import GroupSection from "../components/collection/GroupSection";
import Navigation from "../components/collection/Navigation";
import PaginationSection from "../components/collection/PaginationSection";
import SearchAndFilterSection from "../components/collection/SearchAndFilterSection";
import { usePokemonData } from "../utils/pokemonApi.utils";
import DetailedPokeModal from "../components/collection/modal/DetailedPokeModal";

const LIMIT = 20;
const groups: Array<string> = [
  "cute",
  "hajzli",
  "cool",
  "strong",
  "weak",
  "legendary",
];

export default function App() {
  const [modalOpen, setModalOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = usePokemonData(currentPage, LIMIT);

  const pokemonArr = response?.data || [];
  const totalPages = response?.meta.totalPages || 1;
  const totalItems = response?.meta.totalItems || 0;

  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * LIMIT + 1;
  const endIndex = Math.min(currentPage * LIMIT, totalItems);

  async function handlePageChange(step: number) {
    const nextPage = currentPage + step;
    if (nextPage < 1) return;
    if (nextPage > totalPages) return;

    setCurrentPage(nextPage);
  }
  function handleModalToggle(e: React.MouseEvent) {
    // TODO: dodělat logiku pro zobrazení detailního modalu s daty konkrétního pokemona
    if (e.target !== e.currentTarget) return;
    setModalOpen((prev) => !prev);
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="flex min-h-screen w-full">
        <Navigation />
        <main className="flex w-full flex-col gap-5 bg-pink-300 p-15">
          <GroupSection groups={groups} />
          <div className="flex w-full flex-col gap-3 text-white">
            <SearchAndFilterSection />
            <PaginationSection
              onPageChange={handlePageChange}
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={totalItems}
            />
            <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
              {pokemonArr.map((pokemon, index) => {
                if (!pokemon) return null;
                return (
                  <BaseCard
                    index={pokemon.id}
                    name={pokemon.name}
                    url={pokemon.image}
                    key={index}
                    OnImageClicked={handleModalToggle}
                  />
                );
              })}
            </div>
          </div>
        </main>
      </div>
      {modalOpen && <DetailedPokeModal handleModalOpen={handleModalToggle} />}
    </>
  );
}
