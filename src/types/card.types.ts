export interface CleanCard {
  id: string;
  name: string;
  image: string;
  setName: string;
  type: string[];
  category: string;
  isOwned?: boolean;
}

export interface DetailedCard extends CleanCard {
  abilities: {
    cost?: string[];
    name: string;
    effect?: string;
    damage?: string | number;
  }[];
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
