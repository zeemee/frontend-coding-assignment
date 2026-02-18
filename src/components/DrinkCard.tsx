import type { DrinkSummary } from '../types';
import CategoryBadge from './CategoryBadge';

interface DrinkCardProps {
  drink: DrinkSummary;
  navigate: (to: string) => void;
}

export default function DrinkCard({ drink, navigate }: DrinkCardProps) {
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    navigate(`/drink/${drink.id}`);
  }

  return (
    <a
      href={`/drink/${drink.id}`}
      onClick={handleClick}
      className="flex items-center gap-4 bg-white/5 border border-white/20 rounded-lg overflow-hidden hover:bg-white/10 transition-colors text-left w-full cursor-pointer no-underline"
    >
      <img
        src={drink.image}
        alt={drink.name}
        className="w-[120px] h-[120px] object-cover flex-shrink-0"
      />
      <div className="flex flex-col gap-2 py-3 pr-4">
        <span className="text-white font-bold text-base">{drink.name}</span>
        <CategoryBadge category={drink.category} />
      </div>
    </a>
  );
}
