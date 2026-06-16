import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { PokemonResponse } from "../types/card.types";

async function getPokemonData(
  currentPage: number,
  limit: number,
): Promise<PokemonResponse> {
  const response = await axios.get(
    import.meta.env.VITE_BACKEND_URL +
      `/pokemon?page=${currentPage}&limit=${limit}`,
    { withCredentials: true },
  );
  if (response.status !== 200) throw new Error("Failed to fetch cards");
  if (response.data.length === 0) throw new Error("No cards found");
  return response.data;
}

export function usePokemonData(currentPage: number = 1, limit = 12) {
  return useQuery<PokemonResponse>({
    queryKey: ["pokemon", currentPage],
    queryFn: () => getPokemonData(currentPage, limit),
    placeholderData: (previousData) => previousData,
  });
}
