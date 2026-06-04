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
