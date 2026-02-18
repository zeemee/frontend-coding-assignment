import { useState, useEffect } from 'react';
import type { DrinkDetail } from '../types';
import { getDrinkDetail } from '../api';

export function useDrinkDetail(id: number | null) {
  const [drink, setDrink] = useState<DrinkDetail | null>(null);
  const [isLoading, setIsLoading] = useState(id !== null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === null) return;

    let cancelled = false;

    getDrinkDetail(id)
      .then((data) => {
        if (!cancelled) {
          setDrink(data.drink);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          setDrink(null);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { drink, isLoading, error };
}
