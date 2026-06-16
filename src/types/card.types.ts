export interface CleanCard {
  id: string;
  name: string;
  image: string;
  setName: string;
  type: string[];
  category: string;
}

export interface DetailedCard extends CleanCard {
  abilities: Array<object>;
  rarity: string;
  evolvesFrom: string;
  description: string;
  illustrator: string;
}

export interface PokemonResponse {
  data: CleanCard[];
  meta: {
    totalItems: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}
