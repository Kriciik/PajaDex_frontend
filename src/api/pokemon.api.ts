import axios from "axios";
import { type CleanCard } from "../types/pokemon.types";

const API_BASE_URL = "http://localhost:3000/api";

export async function fetchPokemonList(): Promise<CleanCard[]> {
  try {
    const response = await axios.get("${url}/pokemon");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    throw error;
  }
}
