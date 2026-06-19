import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CleanCard,
  DetailedCard,
  PokemonResponse,
} from "../types/card.types";

async function getPokemonData(
  currentPage: number,
  limit: number,
  search: string,
): Promise<PokemonResponse> {
  const response = await axios.get(
    import.meta.env.VITE_BACKEND_URL + `/pokemon`,
    {
      params: {
        page: currentPage,
        limit: limit,
        name: search.trim(),
      },
      withCredentials: true,
    },
  );
  if (response.status !== 200) throw new Error("Failed to fetch cards");
  if (!response.data) throw new Error("No cards found");
  return response.data;
}

export function usePokemonData(
  currentPage: number = 1,
  limit = 12,
  search = "",
) {
  return useQuery<PokemonResponse>({
    queryKey: ["pokemon", currentPage, search],
    queryFn: () => getPokemonData(currentPage, limit, search),
    placeholderData: (previousData) => previousData,
  });
}

async function getDetailedPokemonData(id: string): Promise<DetailedCard> {
  if (id === "") throw new Error("No id provided for detailed card data");

  const response = await axios.get(
    import.meta.env.VITE_BACKEND_URL + `/pokemon/${id}`,
    { withCredentials: true },
  );
  if (response.status !== 200)
    throw new Error("Failed to fetch detailed card data");
  if (!response.data) throw new Error("No detailed card data found");
  return response.data;
}

export function useDetailedPokemonData(id: string | null) {
  return useQuery<DetailedCard>({
    queryKey: ["pokemonDetailed", id],
    queryFn: () => {
      if (!id) throw new Error("ID is required for fetching detailed data");
      return getDetailedPokemonData(id);
    },
    placeholderData: (previousData) => previousData,
    enabled: !!id,
  });
}

async function toggleCardInCollection(cardData: CleanCard) {
  const response = await axios.post(
    import.meta.env.VITE_BACKEND_URL + `/pokemon/collection`,
    cardData,
    { withCredentials: true },
  );
  return response.data;
}

export function useToggleCardInCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleCardInCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pokemon"] });
    },
    onError: (error) => {
      console.error("Error toggling card in collection:", error);
    },
  });
}
