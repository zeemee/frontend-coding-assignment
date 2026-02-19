import { useQuery } from '@tanstack/react-query';
import { getDrinkDetail } from '../api';

export function useDrinkDetail(id: number | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['drinkDetail', id],
    queryFn: () => getDrinkDetail(id!),
    enabled: id !== null,
  });

  return {
    drink: data?.drink ?? null,
    isLoading,
    error: error ? (error instanceof Error ? error.message : 'An error occurred') : null,
  };
}
