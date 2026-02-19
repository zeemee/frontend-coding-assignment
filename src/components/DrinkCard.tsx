import { Link } from '@tanstack/react-router';
import type { DrinkSummary } from '../types';
import CategoryBadge from './CategoryBadge';

interface DrinkCardProps {
  drink: DrinkSummary;
}

export default function DrinkCard({ drink }: DrinkCardProps) {
  return (
    <Link
      to="/drink/$drinkId"
      params={{ drinkId: String(drink.id) }}
      className="w-[441px] h-[164px] p-2 flex gap-4  border border-white/20 rounded-lg overflow-hidden text-left cursor-pointer no-underline"
    >
      <img
        src={drink.image}
        alt={drink.name}
        className="w-[120px] h-[120px] rounded"
      />
      <div className="">
        <h3 className="text-white font-bold text-[24px]">{drink.name}</h3>
        <CategoryBadge category={drink.category} />
      </div>
    </Link>
  );
}
