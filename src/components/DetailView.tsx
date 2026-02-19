import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useDrinkDetail } from '../hooks/useDrinkDetail';
import CategoryBadge from './CategoryBadge';
import LoadingSpinner from './LoadingSpinner';
import copyIcon from '../assets/Copy-Icon.svg';
import checkIcon from '../assets/Check-Icon.svg';

interface DetailViewProps {
  drinkId: number;
}

export default function DetailView({ drinkId }: DetailViewProps) {
  const navigate = useNavigate();
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
    <div className="flex-1 max-w-[630px] mx-auto">
      <button
        onClick={() => navigate({ to: '/', search: { q: '' } })}
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
              className="w-[220px] h-[220px] rounded object-cover"
            />
            <div className="mt-3">
              <CategoryBadge category={drink.category} />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-white/70 text-[18px] font-semibold uppercase tracking-wider mb-3">
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
          <h3 className="text-white/70 text-[18px] font-semibold uppercase tracking-wider mb-2">
            Instructions
          </h3>
          <p className="text-white text-sm leading-relaxed">{drink.instructions}</p>
        </div>

        {/* Glass Needed */}
        <div className="mb-6">
          <h3 className="text-white/70 text-[18px] font-semibold uppercase tracking-wider mb-2">
            Glass Needed
          </h3>
          <p className="text-white text-sm">Serve: {drink.container}</p>
        </div>

        {/* Share Link */}
        <div>
          <h3 className="text-white/70 text-[18px] font-semibold uppercase tracking-wider mb-2">
            Share Link
          </h3>
          <div className="flex items-center rounded-xl overflow-hidden">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-white px-4 py-3 text-sm text-gray-600 focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-[#104FC9] hover:bg-[#0D3FA1] text-white text-sm font-semibold px-6 py-3 transition-colors cursor-pointer border-none"
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
