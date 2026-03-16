'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = [
  { slug: 'tech', label: 'Tech', emoji: '💻' },
  { slug: 'watches', label: 'Watches', emoji: '⌚' },
  { slug: 'apps', label: 'Apps', emoji: '📱' },
  { slug: 'music', label: 'Music', emoji: '🎵' },
  { slug: 'dining', label: 'Dining', emoji: '🍽️' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-dark-900 border-b border-dark-700 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
          >
            ✦ CURATED
          </Link>
          <div className="flex items-center gap-1 flex-wrap justify-center">
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gold-500 text-dark-900'
                      : 'text-dark-300 hover:text-gold-400 hover:bg-dark-800'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span className="hidden sm:inline">{cat.label}</span>
                </Link>
              );
            })}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-dark-400 hover:text-dark-200 hover:bg-dark-800 transition-all duration-200 ml-2"
            >
              ⚙️ <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
