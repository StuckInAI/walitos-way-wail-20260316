import Link from 'next/link';

const categories = [
  { slug: 'tech', label: 'Tech', emoji: '💻', description: 'Gadgets, hardware & gear' },
  { slug: 'watches', label: 'Watches', emoji: '⌚', description: 'Timepieces worth wearing' },
  { slug: 'apps', label: 'Apps', emoji: '📱', description: 'Software that sparks joy' },
  { slug: 'music', label: 'Music', emoji: '🎵', description: 'Albums & artists to discover' },
  { slug: 'dining', label: 'Dining', emoji: '🍽️', description: 'Restaurants & culinary spots' },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/category/${cat.slug}`}
          className="group flex flex-col items-center text-center p-6 bg-dark-800 border border-dark-700 rounded-xl hover:border-gold-500/50 hover:bg-dark-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-500/10"
        >
          <span className="text-4xl mb-3">{cat.emoji}</span>
          <span className="text-white font-semibold group-hover:text-gold-400 transition-colors">
            {cat.label}
          </span>
          <span className="text-dark-400 text-xs mt-1">{cat.description}</span>
        </Link>
      ))}
    </div>
  );
}
