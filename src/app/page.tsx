import ItemCard from '@/components/ItemCard';
import CategoryGrid from '@/components/CategoryGrid';
import { Item } from '@/entities/Item';

async function getFeaturedItems(): Promise<Item[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/items?featured=true`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getAllItems(): Promise<Item[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/items`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [featuredItems, allItems] = await Promise.all([getFeaturedItems(), getAllItems()]);
  const displayItems = featuredItems.length > 0 ? featuredItems : allItems.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center py-16 sm:py-24">
        <p className="text-gold-400 text-sm font-semibold tracking-[0.3em] uppercase mb-6">
          Personal Curation
        </p>
        <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight">
          My Curated
          <br />
          <span className="text-gold-400">Picks</span>
        </h1>
        <p className="text-dark-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          A carefully curated collection of the things I love most — the tech I use daily,
          the watches I admire, apps that make me more productive, music that moves me,
          and dining spots that leave a lasting impression.
        </p>
        <div className="mt-8 flex items-center justify-center gap-2 text-dark-400 text-sm">
          <span className="h-px w-12 bg-dark-700"></span>
          <span>{allItems.length} curated items across 5 categories</span>
          <span className="h-px w-12 bg-dark-700"></span>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-8">
          Browse by Category
        </h2>
        <CategoryGrid />
      </section>

      {/* Featured Items */}
      {displayItems.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              {featuredItems.length > 0 ? '✦ Featured Picks' : 'Latest Picks'}
            </h2>
            <span className="text-dark-400 text-sm">{displayItems.length} items</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((item) => (
              <ItemCard key={item.id} item={item} showCategory />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
