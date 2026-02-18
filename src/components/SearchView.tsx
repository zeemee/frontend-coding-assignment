import { useSearch } from '../hooks/useSearch';
import DrinkCard from './DrinkCard';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';

interface SearchViewProps {
  query: string;
  navigate: (to: string) => void;
}

export default function SearchView({ query, navigate }: SearchViewProps) {
  const {
    drinks,
    isLoading,
    error,
    currentPage,
    totalPages,
    hasPrev,
    hasNext,
    nextPage,
    prevPage,
  } = useSearch(query);

  return (
    <div className="flex-1 px-8 py-6">
      <h2 className="text-white text-3xl font-bold mb-6">
        {query ? `Results for "${query}"` : 'All Drinks'}
      </h2>

      {isLoading && <LoadingSpinner />}

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {!isLoading && !error && drinks.length === 0 && (
        <p className="text-white/60 text-sm">No drinks found.</p>
      )}

      {!isLoading && !error && drinks.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {drinks.map((drink, idx) => (
              <DrinkCard key={idx} drink={drink} navigate={navigate} />
            ))}
          </div>
          <Pagination
            hasPrev={hasPrev}
            hasNext={hasNext}
            onPrev={prevPage}
            onNext={nextPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}
