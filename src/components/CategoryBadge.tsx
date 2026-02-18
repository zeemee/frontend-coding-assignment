interface CategoryBadgeProps {
  category: string;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase border border-white/40 rounded-full">
      {category}
    </span>
  );
}
