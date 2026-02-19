interface CategoryBadgeProps {
  category: string;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className="mt-2 inline-block px-3 py-1 text-white text-[11px] uppercase border border-white/60 rounded">
      {category}
    </span>
  );
}
