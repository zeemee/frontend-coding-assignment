import type { SearchResponse, DetailResponse, DrinkDetail } from './types';

const BASE_URL = 'https://zeemee-public-api-661c74e270ac.herokuapp.com';
const PAGE_SIZE = 6;

export { PAGE_SIZE };

export async function searchDrinks(query: string, index: number): Promise<SearchResponse> {
  const params = new URLSearchParams({
    index: String(index),
    limit: String(PAGE_SIZE),
  });
  if (query) {
    params.set('query', query);
  }
  const res = await fetch(`${BASE_URL}/api/search?${params}`);
  if (!res.ok) {
    throw new Error(`Search failed: ${res.status}`);
  }
  return res.json() as Promise<SearchResponse>;
}

export async function getDrinkDetail(id: number): Promise<DetailResponse> {
  const res = await fetch(`${BASE_URL}/api/detail?id=${id}`);
  if (!res.ok) {
    throw new Error(`Detail fetch failed: ${res.status}`);
  }
  const data: { drinks: DrinkDetail[] } = await res.json();
  return { drink: data.drinks[0] };
}
