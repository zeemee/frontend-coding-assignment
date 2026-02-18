import { useState, useEffect } from 'react';
import type { DrinkSummary } from '../types';
import { searchDrinks, PAGE_SIZE } from '../api';

export function useSearch(query: string) {
  const [drinks, setDrinks] = useState<DrinkSummary[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prevQuery, setPrevQuery] = useState(query);

  // React pattern for resetting state in response to a prop/argument change during render, without waiting for an effect to run
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (prevQuery !== query) {
    setPrevQuery(query);
    setCurrentIndex(0);
    setIsLoading(true);
    setError(null);
  }

  useEffect(() => {
    let cancelled = false;

    searchDrinks(query, currentIndex)
      .then((data) => {
        if (!cancelled) {
          setDrinks(data.drinks);
          setTotalCount(data.totalCount);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          setDrinks([]);
          setTotalCount(0);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [query, currentIndex]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const currentPage = Math.floor(currentIndex / PAGE_SIZE) + 1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex + PAGE_SIZE < totalCount;

  function nextPage() {
    if (hasNext) {
      setCurrentIndex((i) => i + PAGE_SIZE);
    }
  }

  function prevPage() {
    if (hasPrev) {
      setCurrentIndex((i) => Math.max(0, i - PAGE_SIZE));
    }
  }

  return {
    drinks,
    totalCount,
    isLoading,
    error,
    currentPage,
    totalPages,
    hasPrev,
    hasNext,
    nextPage,
    prevPage,
  };
}
