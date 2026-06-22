import { useEffect, useState } from "react";
import BaseCard from "../components/collection/BaseCard";
import GroupSection from "../components/collection/GroupSection";
import Navigation from "../components/collection/Navigation";
import PaginationSection from "../components/collection/PaginationSection";
import SearchAndFilterSection from "../components/collection/SearchAndFilterSection";
import { useDetailedPokemonData, usePokemonData } from "../api/pokemon.api";
import DetailedPokeModal from "../components/collection/modal/DetailedPokeModal";
import AddToGroupModal from "../components/collection/AddToGroupModal";
import {
  useCreateGroup,
  useDeleteGroup,
  useGroupCardIds,
  useGroupsData,
  useUpdateGroupCards,
} from "../api/groups.api";

// TODO: bude dynamicky, zatím hardcoded
const LIMIT = 15;

// TODO: mazání skupin

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
  const [activeFilterGroupId, setActiveFilterGroupId] = useState<string | null>(
    null,
  );
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [showOwnedOnly, setShowOwnedOnly] = useState(false);

  const debouncedSearch = useDebounce(search, 250);
  const isEditing = editingGroupId !== null;
  const currentGroupId =
    isEditing || showOwnedOnly ? null : activeFilterGroupId;
  const isOnlyOwned = isEditing || showOwnedOnly;

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = usePokemonData(
    currentPage,
    LIMIT,
    debouncedSearch,
    currentGroupId,
    isOnlyOwned,
  );

  const { data: detailedResponse, isLoading: isDetailedLoading } =
    useDetailedPokemonData(selectedId);
  const { data: groups = [] } = useGroupsData();
  const { data: fetchedCardIds } = useGroupCardIds(editingGroupId);
  const deleteGroupMutation = useDeleteGroup();
  const updateGroupCardsMutation = useUpdateGroupCards();

  useEffect(() => {
    if (fetchedCardIds) {
      setSelectedCardIds(fetchedCardIds);
    }
  }, [fetchedCardIds]);

  const createGroupMutation = useCreateGroup();

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

  async function handleAddGroup(name: string) {
    createGroupMutation.mutate({ name });
  }
  function handleFilterSelect(groupId: string) {
    setActiveFilterGroupId((prevGroupId) =>
      prevGroupId === groupId ? null : groupId,
    );
  }
  async function handleStartEdit(groupId: string) {
    setEditingGroupId(groupId);
    setActiveFilterGroupId(null);
    setCurrentPage(1);
  }
  function handleToggleCardInGroup(cardId: string) {
    setSelectedCardIds((prev) =>
      prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId],
    );
  }

  function handleSaveGroupCards() {
    if (!editingGroupId) return;

    updateGroupCardsMutation.mutate(
      { groupId: editingGroupId, cardIds: selectedCardIds },
      {
        onSuccess: () => {
          setEditingGroupId(null);
          setSelectedCardIds([]);
        },
      },
    );
  }

  function handleCancelGroupCards() {
    setEditingGroupId(null);
    setSelectedCardIds([]);
  }

  function handleShowOwnedChange(checked: boolean) {
    setShowOwnedOnly(checked);
    setCurrentPage(1);
    if (checked) {
      setActiveFilterGroupId(null);
    }
  }

  function handleDeleteGroup() {
    if (!editingGroupId) return;
    deleteGroupMutation.mutate(editingGroupId, {
      onSuccess: () => {
        setEditingGroupId(null);
        setSelectedCardIds([]);
      },
    });
  }
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="w-ful flex min-h-screen font-medium">
        <Navigation />
        <main className="z-3 flex w-full flex-col gap-5 bg-pink-300 p-15 shadow-2xl">
          <GroupSection
            groups={groups}
            onAddGroup={handleAddGroup}
            activeFilterGroupId={activeFilterGroupId}
            onFilterSelect={handleFilterSelect}
            editingGroupId={editingGroupId}
            onStartEdit={handleStartEdit}
          />
          <div className="flex w-full flex-col gap-3 text-white">
            <SearchAndFilterSection
              value={search}
              setSearch={setSearch}
              setCurrentPage={setCurrentPage}
              showOwnedOnly={showOwnedOnly}
              onShowOwnedChange={handleShowOwnedChange}
              isEditing={isEditing}
            />
            <PaginationSection
              onPageChange={handlePageChange}
              startIndex={pageStartIndex}
              endIndex={pageEndIndex}
              totalItems={totalItems}
              totalPages={totalPages}
            />
            <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
              {pokemonArr.map((pokemon) => {
                if (!pokemon) return null;
                return (
                  <BaseCard
                    card={pokemon}
                    key={pokemon.id}
                    onImageClicked={() => setSelectedId(pokemon.id)}
                    isEditMode={editingGroupId !== null}
                    isGroupMember={selectedCardIds.includes(pokemon.id)}
                    onToggleGroup={() => handleToggleCardInGroup(pokemon.id)}
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
      {editingGroupId && (
        <AddToGroupModal
          onSave={handleSaveGroupCards}
          onCancel={handleCancelGroupCards}
          onDelete={handleDeleteGroup}
          isPending={updateGroupCardsMutation.isPending}
        />
      )}
    </>
  );
}
