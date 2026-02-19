import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchDrinks, PAGE_SIZE } from '../api';

export function useSearch(query: string) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevQuery, setPrevQuery] = useState(query);

  if (prevQuery !== query) {
    setPrevQuery(query);
    setCurrentIndex(0);
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', query, currentIndex],
    queryFn: () => searchDrinks(query, currentIndex),
  });

  const drinks = data?.drinks ?? [];
  const totalCount = data?.totalCount ?? 0;

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
    error: error ? (error instanceof Error ? error.message : 'An error occurred') : null,
    currentPage,
    totalPages,
    hasPrev,
    hasNext,
    nextPage,
    prevPage,
  };
}
