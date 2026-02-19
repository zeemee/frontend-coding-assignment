import prevIcon from '../assets/Prev-Icon.svg';
import nextIcon from '../assets/Next-Icon.svg';

interface PaginationProps {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ hasPrev, hasNext, onPrev, onNext }: PaginationProps) {
  return (
    <div className="flex items-center gap-2 mt-6">
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        aria-label="Previous page"
        className="w-9 h-9 flex items-center justify-center bg-white/10 border border-white/20 rounded disabled:opacity-30 hover:bg-white/20 transition-colors disabled:cursor-not-allowed cursor-pointer"
      >
        <img src={prevIcon} alt="" className="w-4 h-4" />
      </button>
      <button
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Next page"
        className="w-9 h-9 flex items-center justify-center bg-white/10 border border-white/20 rounded disabled:opacity-30 hover:bg-white/20 transition-colors disabled:cursor-not-allowed cursor-pointer"
      >
        <img src={nextIcon} alt="" className="w-4 h-4" />
      </button>
    </div>
  );
}
