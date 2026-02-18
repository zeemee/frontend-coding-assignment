import { useState } from 'react';
import { useDrinkDetail } from '../hooks/useDrinkDetail';
import CategoryBadge from './CategoryBadge';
import LoadingSpinner from './LoadingSpinner';
import copyIcon from '../assets/Copy-Icon.svg';
import checkIcon from '../assets/Check-Icon.svg';

interface DetailViewProps {
  drinkId: number;
  navigate: (to: string) => void;
}

export default function DetailView({ drinkId, navigate }: DetailViewProps) {
  const { drink, isLoading, error } = useDrinkDetail(drinkId);
  const [copied, setCopied] = useState(false);

  if (isLoading) return <div className="flex-1"><LoadingSpinner /></div>;
  if (error) return <div className="flex-1 px-8 py-6"><p className="text-red-400">{error}</p></div>;
  if (!drink) return null;

  const shareUrl = window.location.href;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // todo: Clipboard API may fail in some environments
    }
  }

  return (
    <div className="flex-1 px-8 py-6">
      <button
        onClick={() => navigate('/')}
        className="text-white/60 text-sm mb-4 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
      >
        &larr; Back
      </button>

      <h2 className="text-white text-3xl font-bold mb-6">{drink.name}</h2>

      <div className="bg-white/5 border border-white/20 rounded-lg p-6">
        {/* Top section: image + ingredients */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-shrink-0">
            <img
              src={drink.image}
              alt={drink.name}
              className="w-full md:w-[280px] h-auto rounded-lg object-cover"
            />
            <div className="mt-3">
              <CategoryBadge category={drink.category} />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-amber-400/80 text-sm font-semibold uppercase tracking-wider mb-3">
              {drink.ingredients.length} Ingredients
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {drink.ingredients.map((ing, i) => (
                <p key={i} className="text-white text-sm">
                  {ing.measurement} {ing.name}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h3 className="text-amber-400/80 text-sm font-semibold uppercase tracking-wider mb-2">
            Instructions
          </h3>
          <p className="text-white text-sm leading-relaxed">{drink.instructions}</p>
        </div>

        {/* Glass Needed */}
        <div className="mb-6">
          <h3 className="text-amber-400/80 text-sm font-semibold uppercase tracking-wider mb-2">
            Glass Needed
          </h3>
          <p className="text-white text-sm">Serve: {drink.container}</p>
        </div>

        {/* Share Link */}
        <div>
          <h3 className="text-amber-400/80 text-sm font-semibold uppercase tracking-wider mb-2">
            Share Link
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm text-white/70 focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer border-none"
            >
              <img src={copied ? checkIcon : copyIcon} alt="" className="w-4 h-4" />
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
