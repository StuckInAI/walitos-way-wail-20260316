import { v4 as uuidv4 } from 'uuid';
import { Item } from '../entities/Item';

export const seedData: Partial<Item>[] = [
  // Tech
  {
    id: uuidv4(),
    title: 'Framework Laptop 16',
    category: 'tech',
    description:
      'The ultimate modular laptop experience. Framework has redefined repairability and upgradability in a sleek, powerful package. With a stunning 16-inch display and swappable input modules, this machine is built to last a lifetime.',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    externalLink: 'https://frame.work',
    rating: 5,
    tags: 'laptop,modular,sustainable,productivity',
    featured: true,
  },
  {
    id: uuidv4(),
    title: 'Sony WH-1000XM5',
    category: 'tech',
    description:
      'Industry-leading noise cancellation meets exceptional audio quality. These headphones are my constant companion for deep work sessions and long flights. The 30-hour battery life and premium build quality make them worth every penny.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    externalLink: 'https://www.sony.com',
    rating: 5,
    tags: 'headphones,noise-cancelling,audio,wireless',
    featured: true,
  },
  {
    id: uuidv4(),
    title: 'Keychron Q1 Pro',
    category: 'tech',
    description:
      'A gasket-mounted, wireless mechanical keyboard that types like a dream. The aluminum build feels substantial without being excessive, and the QMK/VIA support means infinite customization. Available in multiple switch options.',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    externalLink: 'https://www.keychron.com',
    rating: 4,
    tags: 'keyboard,mechanical,wireless,productivity',
    featured: false,
  },
  // Watches
  {
    id: uuidv4(),
    title: 'Seiko Prospex SPB143',
    category: 'watches',
    description:
      'Seiko\'s in-house calibre 6R35 movement beats at the heart of this stunning diver. The textured dial with its unique pattern catches light beautifully, and the 200m water resistance means it can handle any adventure.',
    imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80',
    externalLink: 'https://www.seikowatches.com',
    rating: 5,
    tags: 'diver,automatic,japanese,seiko',
    featured: true,
  },
  {
    id: uuidv4(),
    title: 'Nomos Glashütte Club Campus',
    category: 'watches',
    description:
      'German minimalism at its finest. The Bauhaus-inspired design, ultra-thin profile, and in-house Alpha movement make this the perfect dress watch. A statement of understated elegance for any occasion.',
    imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80',
    externalLink: 'https://nomos-glashuette.com',
    rating: 5,
    tags: 'dress-watch,german,bauhaus,minimalist',
    featured: false,
  },
  {
    id: uuidv4(),
    title: 'Casio G-Shock GA-2100',
    category: 'watches',
    description:
      'The CasiOak — an unlikely design icon. This ultra-thin G-Shock borrows its octagonal case shape from a certain Swiss luxury watch, but delivers it with Casio\'s legendary toughness at a fraction of the price.',
    imageUrl: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=800&q=80',
    externalLink: 'https://www.casio.com',
    rating: 4,
    tags: 'g-shock,digital,tough,casual',
    featured: false,
  },
  // Apps
  {
    id: uuidv4(),
    title: 'Obsidian',
    category: 'apps',
    description:
      'A knowledge management tool that actually respects your data. Local-first, markdown-based, and endlessly extensible through plugins. My entire second brain lives here — notes, projects, ideas, and connections between them.',
    imageUrl: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800&q=80',
    externalLink: 'https://obsidian.md',
    rating: 5,
    tags: 'notes,productivity,markdown,pkm',
    featured: true,
  },
  {
    id: uuidv4(),
    title: 'Raycast',
    category: 'apps',
    description:
      'Spotlight on steroids for macOS. Raycast replaces your launcher, clipboard manager, snippet tool, and dozens of other utilities in one blazingly fast package. Once you start using it, there\'s no going back.',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    externalLink: 'https://raycast.com',
    rating: 5,
    tags: 'macos,launcher,productivity,automation',
    featured: false,
  },
  {
    id: uuidv4(),
    title: 'Readwise Reader',
    category: 'apps',
    description:
      'The read-it-later app reimagined. Reader combines RSS feeds, newsletters, PDFs, web articles, and Twitter threads into a single, beautifully designed reading experience with powerful highlighting and AI summarization.',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    externalLink: 'https://readwise.io/read',
    rating: 4,
    tags: 'reading,rss,highlights,knowledge',
    featured: false,
  },
  // Music
  {
    id: uuidv4(),
    title: 'Kendrick Lamar — DAMN.',
    category: 'music',
    description:
      'A Pulitzer Prize-winning masterpiece of modern hip-hop. Every track is meticulously crafted, the production is flawless, and the themes of morality, identity, and culture are explored with unparalleled depth. A landmark album of our generation.',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    externalLink: 'https://open.spotify.com',
    rating: 5,
    tags: 'hip-hop,rap,pulitzer,classic',
    featured: true,
  },
  {
    id: uuidv4(),
    title: 'Nils Frahm — All Melody',
    category: 'music',
    description:
      'Nils Frahm\'s magnum opus. A breathtaking blend of classical piano and electronic production that creates something entirely new. Perfect for deep focus work or late-night contemplation. This album changed how I think about music.',
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80',
    externalLink: 'https://open.spotify.com',
    rating: 5,
    tags: 'neoclassical,piano,electronic,ambient',
    featured: false,
  },
  {
    id: uuidv4(),
    title: 'Khruangbin — Con Todo El Mundo',
    category: 'music',
    description:
      'Houston\'s most eclectic trio delivers a sonic journey through Middle Eastern scales, Thai funk, and soul music. The bass lines are intoxicating, the guitar work is sublime, and the whole album feels like a warm evening in an exotic city.',
    imageUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80',
    externalLink: 'https://open.spotify.com',
    rating: 4,
    tags: 'funk,world-music,psychedelic,groove',
    featured: false,
  },
  // Dining
  {
    id: uuidv4(),
    title: 'Noma Copenhagen',
    category: 'dining',
    description:
      'René Redzepi\'s legendary restaurant redefined what Nordic cuisine could be. The fermentation lab, the hyper-seasonal menus, and the sheer creativity on every plate make this a once-in-a-lifetime dining experience. Book months in advance.',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    externalLink: 'https://noma.dk',
    rating: 5,
    tags: 'fine-dining,nordic,seasonal,fermentation',
    featured: true,
  },
  {
    id: uuidv4(),
    title: 'Sukiyabashi Jiro',
    category: 'dining',
    description:
      'The subject of Jiro Dreams of Sushi. Three Michelin stars for a 10-seat counter in a Tokyo subway station. Jiro Ono\'s omakase is the purest expression of sushi craftsmanship — each piece arriving at its optimal temperature and taste.',
    imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80',
    externalLink: 'https://www.sushi-jiro.jp',
    rating: 5,
    tags: 'sushi,japanese,omakase,michelin',
    featured: false,
  },
  {
    id: uuidv4(),
    title: 'Tartine Bakery',
    category: 'dining',
    description:
      'Chad Robertson\'s San Francisco institution produces what many consider the world\'s finest country loaves. The afternoon bread lines are legendary — arrive at 5pm sharp for a warm loaf fresh from the oven. Their morning buns are equally transcendent.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    externalLink: 'https://tartinebakery.com',
    rating: 5,
    tags: 'bakery,sourdough,san-francisco,breakfast',
    featured: false,
  },
];
