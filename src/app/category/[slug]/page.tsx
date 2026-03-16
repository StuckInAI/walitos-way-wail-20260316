import { notFound } from 'next/navigation';
import ItemCard from '@/components/ItemCard';
import { Item } from '@/entities/Item';

const categoryMeta: Record<string, { label: string; emoji: string; description: string }> = {
  tech: {
    label: 'Tech',
    emoji: '💻',
    description: 'The gadgets, hardware, and gear that power my workflow and daily life.',
  },
  watches: {
    label: 'Watches',
    emoji: '⌚',
    description: 'Timepieces that blend engineering and artistry in perfect harmony.',
  },
  apps: {
    label: 'Apps',
    emoji: '📱',
    description: 'Software that genuinely improves how I think, work, and create.',
  },
  music: {
    label: 'Music',
    emoji: '🎵',
    description: 'Albums and artists that have shaped my taste and fueled countless hours.',
  },
  dining: {
    label: 'Dining',
    emoji: '🍽️',
    description: 'Restaurants and culinary experiences that left a lasting impression.',
  },
};

async function getCategoryItems(category: string): Promise<Item[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/items?category=${category}`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  return Object.keys(categoryMeta).map((slug) => ({ slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const meta = categoryMeta[params.slug];
  if (!meta) notFound();

  const items = await getCategoryItems(params.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{meta.emoji}</span>
          <div>
            <p className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-1">
              Category
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">{meta.label}</h1>
          </div>
        </div>
        <p className="text-dark-300 text-lg max-w-2xl mt-4">{meta.description}</p>
        <div className="mt-6 flex items-center gap-2 text-dark-500 text-sm">
          <span className="h-px w-8 bg-dark-700"></span>
          <span>{items.length} {items.length === 1 ? 'item' : 'items'} curated</span>
        </div>
      </div>

      {/* Grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-6xl mb-4">{meta.emoji}</p>
          <p className="text-dark-400 text-lg">No items in this category yet.</p>
          <p className="text-dark-600 text-sm mt-2">Check back soon or add items via the admin panel.</p>
        </div>
      )}
    </div>
  );
}
