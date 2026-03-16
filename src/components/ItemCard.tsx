import Link from 'next/link';
import Image from 'next/image';
import StarRating from './StarRating';
import { Item } from '@/entities/Item';

const categoryEmoji: Record<string, string> = {
  tech: '💻',
  watches: '⌚',
  apps: '📱',
  music: '🎵',
  dining: '🍽️',
};

interface ItemCardProps {
  item: Item;
  showCategory?: boolean;
}

export default function ItemCard({ item, showCategory = false }: ItemCardProps) {
  const tags = item.tags ? item.tags.split(',').filter(Boolean) : [];

  return (
    <Link href={`/item/${item.id}`} className="group block">
      <div className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-gold-500/50 hover:shadow-xl hover:shadow-gold-500/10 hover:-translate-y-1">
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-dark-700">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-5xl">
              {categoryEmoji[item.category] || '✦'}
            </div>
          )}
          {item.featured && (
            <div className="absolute top-3 left-3 bg-gold-500 text-dark-900 text-xs font-bold px-2 py-1 rounded-full">
              Featured
            </div>
          )}
          {showCategory && (
            <div className="absolute top-3 right-3 bg-dark-900/80 backdrop-blur-sm text-dark-200 text-xs px-2 py-1 rounded-full">
              {categoryEmoji[item.category]} {item.category}
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-gold-400 transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-dark-300 text-sm leading-relaxed mb-3 line-clamp-2">
            {item.description}
          </p>
          {item.rating && (
            <div className="mb-3">
              <StarRating rating={item.rating} size="sm" />
            </div>
          )}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 bg-dark-700 text-dark-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
