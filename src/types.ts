export interface DrinkSummary {
  id: number;
  name: string;
  category: string;
  image: string;
}

export interface Ingredient {
  name: string;
  measurement: string;
}

export interface DrinkDetail extends DrinkSummary {
  instructions: string;
  container: string;
  ingredients: Ingredient[];
}

export interface SearchResponse {
  totalCount: number;
  drinks: DrinkSummary[];
}

export interface DetailResponse {
  drink: DrinkDetail;
}
