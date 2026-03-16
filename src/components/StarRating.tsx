interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ rating, max = 5, size = 'md' }: StarRatingProps) {
  const sizeClass = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  }[size];

  return (
    <div className={`flex items-center gap-0.5 ${sizeClass}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? 'text-gold-400' : 'text-dark-600'}
        >
          ★
        </span>
      ))}
    </div>
  );
}
