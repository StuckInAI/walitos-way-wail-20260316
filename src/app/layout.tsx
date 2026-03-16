import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Curated — My Personal Picks',
  description: 'A personal curation of the best tech, watches, apps, music, and dining spots.',
  keywords: 'curated, lifestyle, tech, watches, apps, music, dining',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-950 text-dark-100 min-h-screen antialiased">
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-dark-800 mt-20 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-dark-500 text-sm">
              ✦ Curated with care &mdash; {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
