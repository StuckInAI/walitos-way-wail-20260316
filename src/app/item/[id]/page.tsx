import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import StarRating from '@/components/StarRating';
import { Item } from '@/entities/Item';

const categoryMeta: Record<string, { label: string; emoji: string }> = {
  tech: { label: 'Tech', emoji: '💻' },
  watches: { label: 'Watches', emoji: '⌚' },
  apps: { label: 'Apps', emoji: '📱' },
  music: { label: 'Music', emoji: '🎵' },
  dining: { label: 'Dining', emoji: '🍽️' },
};

async function getItem(id: string): Promise<Item | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/items/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ItemPage({ params }: { params: { id: string } }) {
  const item = await getItem(params.id);
  if (!item) notFound();

  const meta = categoryMeta[item.category];
  const tags = item.tags ? item.tags.split(',').filter(Boolean) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-dark-500 mb-8">
        <Link href="/" className="hover:text-gold-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/category/${item.category}`}
          className="hover:text-gold-400 transition-colors"
        >
          {meta?.emoji} {meta?.label}
        </Link>
        <span>/</span>
        <span className="text-dark-300 truncate max-w-[200px]">{item.title}</span>
      </nav>

      <article>
        {/* Image */}
        {item.imageUrl && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 bg-dark-800">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
            {item.featured && (
              <div className="absolute top-4 left-4 bg-gold-500 text-dark-900 text-sm font-bold px-3 py-1.5 rounded-full">
                ✦ Featured Pick
              </div>
            )}
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link
              href={`/category/${item.category}`}
              className="text-xs font-semibold tracking-widest uppercase text-gold-400 hover:text-gold-300 transition-colors"
            >
              {meta?.emoji} {meta?.label}
            </Link>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{item.title}</h1>
          {item.rating && (
            <div className="flex items-center gap-3">
              <StarRating rating={item.rating} size="lg" />
              <span className="text-dark-400 text-sm">{item.rating}/5</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 mb-8">
          <p className="text-dark-200 text-lg leading-relaxed">{item.description}</p>
        </div>

        {/* Tags & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 bg-dark-800 border border-dark-700 text-dark-300 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          {item.externalLink && (
            <a
              href={item.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-dark-900 font-semibold px-6 py-3 rounded-full transition-colors duration-200"
            >
              Visit Site
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-dark-800">
          <Link
            href={`/category/${item.category}`}
            className="inline-flex items-center gap-2 text-dark-400 hover:text-gold-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {meta?.label}
          </Link>
        </div>
      </article>
    </div>
  );
}
