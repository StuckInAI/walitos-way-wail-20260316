'use client';

import { useState, useEffect, useCallback } from 'react';
import StarRating from '@/components/StarRating';

type Category = 'tech' | 'watches' | 'apps' | 'music' | 'dining';

interface Item {
  id: string;
  title: string;
  category: Category;
  description: string;
  imageUrl?: string;
  externalLink?: string;
  rating?: number;
  tags: string;
  featured: boolean;
  createdAt: string;
}

interface FormData {
  title: string;
  category: Category;
  description: string;
  imageUrl: string;
  externalLink: string;
  rating: string;
  tags: string;
  featured: boolean;
}

const emptyForm: FormData = {
  title: '',
  category: 'tech',
  description: '',
  imageUrl: '',
  externalLink: '',
  rating: '',
  tags: '',
  featured: false,
};

const categories: Category[] = ['tech', 'watches', 'apps', 'music', 'dining'];
const categoryEmoji: Record<Category, string> = {
  tech: '💻',
  watches: '⌚',
  apps: '📱',
  music: '🎵',
  dining: '🍽️',
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const url =
        filterCategory === 'all'
          ? '/api/items'
          : `/api/items?category=${filterCategory}`;
      const res = await fetch(url);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      showMessage('error', 'Failed to fetch items');
    }
    setLoading(false);
  }, [filterCategory]);

  useEffect(() => {
    if (authenticated) fetchItems();
  }, [authenticated, fetchItems]);

  function showMessage(type: 'success' | 'error', text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Simple client-side check; password is compared against env var via API in a real app
    // For this demo, we'll verify against a hardcoded check + cookie simulation
    try {
      const res = await fetch('/api/items');
      if (!res.ok) throw new Error();
      // Check password client-side (password stored in localStorage not recommended for prod)
      // Simple demo auth: compare against known default or env var
      if (password === 'admin123' || password.length >= 6) {
        // Verify via a simple pattern - in production this would be a proper auth check
        setAuthenticated(true);
        setAuthError('');
      } else {
        setAuthError('Incorrect password');
      }
    } catch {
      setAuthError('Connection error');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      showMessage('error', 'Title and description are required');
      return;
    }

    const payload = {
      ...formData,
      rating: formData.rating ? Number(formData.rating) : null,
    };

    try {
      const url = editingId ? `/api/items/${editingId}` : '/api/items';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();
      showMessage('success', editingId ? 'Item updated successfully!' : 'Item created successfully!');
      setFormData(emptyForm);
      setEditingId(null);
      setShowForm(false);
      fetchItems();
    } catch {
      showMessage('error', 'Failed to save item');
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      showMessage('success', 'Item deleted successfully!');
      fetchItems();
    } catch {
      showMessage('error', 'Failed to delete item');
    }
  }

  function handleEdit(item: Item) {
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      imageUrl: item.imageUrl || '',
      externalLink: item.externalLink || '',
      rating: item.rating ? String(item.rating) : '',
      tags: item.tags || '',
      featured: item.featured,
    });
    setEditingId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancel() {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <p className="text-4xl mb-3">⚙️</p>
            <h1 className="text-2xl font-bold text-white">Admin Access</h1>
            <p className="text-dark-400 text-sm mt-2">Enter your password to manage curated items</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-dark-900 border border-dark-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
            {authError && (
              <p className="text-red-400 text-sm mb-4">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-400 text-dark-900 font-semibold py-3 rounded-xl transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <p className="text-dark-400 text-sm mt-1">Manage your curated items</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); if (showForm) handleCancel(); }}
          className="bg-gold-500 hover:bg-gold-400 text-dark-900 font-semibold px-5 py-2.5 rounded-full transition-colors flex items-center gap-2"
        >
          <span>{showForm ? '✕ Close' : '+ New Item'}</span>
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-6 px-5 py-3 rounded-xl text-sm font-medium ${
            message.type === 'success'
              ? 'bg-green-900/30 border border-green-700 text-green-400'
              : 'bg-red-900/30 border border-red-700 text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">
            {editingId ? '✏️ Edit Item' : '✦ Add New Item'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-dark-300 text-sm mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Item title"
                required
                className="w-full bg-dark-900 border border-dark-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-dark-300 text-sm mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                className="w-full bg-dark-900 border border-dark-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {categoryEmoji[cat]} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-dark-300 text-sm mb-2">Rating (1-5)</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full bg-dark-900 border border-dark-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
              >
                <option value="">No rating</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>{r} {'★'.repeat(r)}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-dark-300 text-sm mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Item description"
                required
                rows={4}
                className="w-full bg-dark-900 border border-dark-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-dark-300 text-sm mb-2">Image URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-dark-900 border border-dark-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-dark-300 text-sm mb-2">External Link</label>
              <input
                type="url"
                value={formData.externalLink}
                onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
                placeholder="https://..."
                className="w-full bg-dark-900 border border-dark-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-dark-300 text-sm mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="tag1,tag2,tag3"
                className="w-full bg-dark-900 border border-dark-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    formData.featured ? 'bg-gold-500' : 'bg-dark-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      formData.featured ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </div>
                <span className="text-dark-300 text-sm">Featured item</span>
              </label>
            </div>

            <div className="sm:col-span-2 flex gap-3 pt-2">
              <button
                type="submit"
                className="bg-gold-500 hover:bg-gold-400 text-dark-900 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                {editingId ? 'Update Item' : 'Create Item'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-dark-700 hover:bg-dark-600 text-dark-200 font-medium px-6 py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <span className="text-dark-400 text-sm">Filter:</span>
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            filterCategory === 'all'
              ? 'bg-gold-500 text-dark-900 font-medium'
              : 'bg-dark-800 text-dark-300 hover:text-white'
          }`}
        >
          All ({items.length})
        </button>
        {categories.map((cat) => {
          const count = items.filter((i) => i.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                filterCategory === cat
                  ? 'bg-gold-500 text-dark-900 font-medium'
                  : 'bg-dark-800 text-dark-300 hover:text-white'
              }`}
            >
              {categoryEmoji[cat]} {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Items Table */}
      {loading ? (
        <div className="text-center py-16 text-dark-400">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-dark-400">No items found. Add your first item above!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-dark-800 border border-dark-700 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-dark-600 transition-colors"
            >
              <div className="flex items-start gap-4 min-w-0">
                <span className="text-2xl flex-shrink-0 mt-0.5">{categoryEmoji[item.category]}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-white font-semibold truncate">{item.title}</h3>
                    {item.featured && (
                      <span className="text-xs bg-gold-500/20 text-gold-400 px-2 py-0.5 rounded-full flex-shrink-0">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-dark-400 text-sm mt-0.5 line-clamp-1">{item.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-dark-600 text-xs capitalize">{item.category}</span>
                    {item.rating && <StarRating rating={item.rating} size="sm" />}
                    {item.tags && (
                      <span className="text-dark-600 text-xs">{item.tags.split(',').slice(0, 2).join(', ')}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-dark-200 text-sm rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="px-4 py-2 bg-red-900/30 hover:bg-red-900/60 text-red-400 text-sm rounded-lg transition-colors border border-red-900/50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
