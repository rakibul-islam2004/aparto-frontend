'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  PhoneCall, 
  Sparkles, 
  ChevronDown, 
  MessageCircle,
  Building2,
  SlidersHorizontal,
  Loader2
} from 'lucide-react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(3);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  React.useEffect(() => {
    if (!isSearchOpen || !searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const api = (await import('@/lib/api')).default;
        const { data } = await api.get(`/products/search?q=${encodeURIComponent(searchQuery)}`);
        setSearchResults(data.products || []);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [isSearchOpen, searchQuery]);

  const roomCategories = [
    { name: 'Bathroom Accessories', href: '/categories/bathroom', count: '120+ Items', icon: '🛁' },
    { name: 'Bedroom Decor', href: '/categories/bedroom', count: '95+ Items', icon: '🛏️' },
    { name: 'Kitchen & Dining', href: '/categories/kitchen', count: '150+ Items', icon: '🍳' },
    { name: 'Living Room Essentials', href: '/categories/living-room', count: '180+ Items', icon: '🛋️' },
    { name: 'Balcony & Outdoor', href: '/categories/balcony', count: '45+ Items', icon: '🪴' },
    { name: 'Home Office & Desk', href: '/categories/office', count: '60+ Items', icon: '💻' },
  ];

  const seriesCollections = [
    { name: 'Cleo Enigma Series', badge: 'Luxury Minimalist', href: '/collections/cleo-enigma' },
    { name: 'Heritage Towel Collection', badge: 'Set of 3 Offer', href: '/collections/heritage-towels' },
    { name: 'Zayn Table Runner Series', badge: 'New Arrival', href: '/collections/zayn-series' },
    { name: 'Space-Saving Furniture', badge: 'Studio Essential', href: '/collections/space-saving' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-200">
      {/* 1. Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">
            Special Offer
          </span>
          <span>Free Express Shipping across Dhaka on orders over ৳2,500!</span>
        </div>

        <div className="flex items-center gap-4 text-slate-300 text-[11px]">
          <a href="tel:+8801700000000" className="hover:text-amber-400 flex items-center gap-1 transition">
            <PhoneCall className="w-3.5 h-3.5" /> Hotline: +880 1700-000000
          </a>
          <span className="text-slate-600">|</span>
          <Link href="/track-order" className="hover:text-sky-400 transition">
            Track Shipment
          </Link>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
              Aparto<span className="text-sky-600 dark:text-sky-400">.</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase font-medium text-slate-500 dark:text-slate-400">
              Apartment Living Bangladesh
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700 dark:text-slate-200">
          <Link href="/" className="hover:text-sky-600 dark:hover:text-sky-400 transition">
            Home
          </Link>

          {/* Room-based Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-sky-600 dark:hover:text-sky-400 transition py-2">
              <span>Shop by Room</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute left-0 top-full hidden group-hover:block w-72 bg-white dark:bg-slate-900 shadow-xl rounded-xl border border-slate-100 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {roomCategories.map((cat, idx) => (
                <Link
                  key={idx}
                  href={cat.href}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{cat.icon}</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{cat.name}</span>
                  </div>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded font-mono">
                    {cat.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Series Collections Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-sky-600 dark:hover:text-sky-400 transition py-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Curated Series</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute left-0 top-full hidden group-hover:block w-80 bg-white dark:bg-slate-900 shadow-xl rounded-xl border border-slate-100 dark:border-slate-800 p-3 z-50">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 px-2">
                Featured Competitor Series
              </div>
              {seriesCollections.map((col, idx) => (
                <Link
                  key={idx}
                  href={col.href}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-sky-50 dark:hover:bg-slate-800 transition group/item"
                >
                  <span className="font-medium text-slate-800 dark:text-slate-200 group-hover/item:text-sky-600 dark:group-hover/item:text-sky-400">
                    {col.name}
                  </span>
                  <span className="text-[10px] gold-gradient-badge px-2 py-0.5 rounded font-medium shadow-sm">
                    {col.badge}
                  </span>
                </Link>
              ))}
            </div>
          </div>

           <Link href="/products" className="flex items-center gap-1.5 hover:text-sky-600 dark:hover:text-sky-400 transition">
             <SlidersHorizontal className="w-4 h-4 text-sky-500" />
             <span>All Products</span>
           </Link>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Live Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3.5 py-2 rounded-xl text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Search towel, clock, lamp...</span>
            <kbd className="hidden lg:inline-block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="p-2 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition relative"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="p-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-md shadow-sky-600/20 transition flex items-center gap-2 relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline font-semibold text-xs">৳3,450</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Profile */}
          <Link
            href="/account"
            className="p-2 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            aria-label="Account"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* 3. WhatsApp Direct Quick Contact Bubble */}
      <a
        href="https://wa.me/8801700000000?text=Hello%20Aparto%20Support%2C%20I%20have%20an%20inquiry"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-lg shadow-emerald-500/30 flex items-center justify-center transition-transform hover:scale-110"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>

      {/* 4. Live Predictive Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products by room, name, series or barcode (e.g. Cleo, Towel, 120038)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-sm focus:outline-none text-slate-900 dark:text-white placeholder-slate-400"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 max-h-80 overflow-y-auto">
              {isSearching ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : searchQuery.trim() && searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                        {product.media?.[0] ? (
                          <img src={product.media[0].url} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <Search className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-slate-900 dark:text-white truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category?.name}</p>
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        ৳{product.variants?.[0] ? Number(product.variants[0].price).toLocaleString() : 'N/A'}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : searchQuery.trim() && !isSearching ? (
                <p className="text-sm text-muted-foreground text-center py-4">No products found for &quot;{searchQuery}&quot;</p>
              ) : (
                <>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Trending Searches in BD
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Heritage Bath Towel 3-Set', 'Cleo Enigma Pillow Cover', 'Monrowe Wall Clock', 'Retro TV Tissue Box', 'Space Saving Shelf'].map((term, i) => (
                      <button
                        key={i}
                        onClick={() => setSearchQuery(term)}
                        className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-lg hover:bg-sky-50 hover:text-sky-600 transition"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
