'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Star, QrCode, Sparkles } from 'lucide-react';

export interface ProductCardProps {
  id: string;
  name: string;
  series?: string;
  category: string;
  regularPrice: number;
  salePrice?: number;
  rating: number;
  reviewsCount: number;
  barcode: string;
  isPreorder?: boolean;
  spaceOptimized?: boolean;
  imageBg: string;
}

const mockProducts: ProductCardProps[] = [
  {
    id: 'prod-1',
    name: 'Cleo Enigma Velvet Pillow Cover',
    series: 'Cleo Enigma Series',
    category: 'Bedroom Decor',
    regularPrice: 1200,
    salePrice: 850,
    rating: 4.9,
    reviewsCount: 34,
    barcode: '120038472105',
    spaceOptimized: true,
    imageBg: 'from-amber-100 to-amber-200 dark:from-slate-800 dark:to-amber-950',
  },
  {
    id: 'prod-2',
    name: 'Heritage Soap Dispenser & Holder',
    series: 'Heritage Series',
    category: 'Bathroom Accessories',
    regularPrice: 1850,
    salePrice: 1450,
    rating: 4.8,
    reviewsCount: 22,
    barcode: '120042891002',
    spaceOptimized: true,
    imageBg: 'from-sky-100 to-sky-200 dark:from-slate-800 dark:to-sky-950',
  },
  {
    id: 'prod-3',
    name: 'Monrowe Nordic Wall Clock',
    series: 'Nordic Timepiece',
    category: 'Wall Decor',
    regularPrice: 3200,
    salePrice: 2600,
    rating: 5.0,
    reviewsCount: 48,
    barcode: '120055104408',
    spaceOptimized: false,
    imageBg: 'from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900',
  },
  {
    id: 'prod-4',
    name: 'Beyond Aeroshift Studio Ergonomic Chair',
    series: 'Beyond Ergosync',
    category: 'Home Office',
    regularPrice: 14500,
    salePrice: 12800,
    rating: 4.9,
    reviewsCount: 19,
    barcode: '120088910214',
    isPreorder: true,
    spaceOptimized: true,
    imageBg: 'from-teal-100 to-teal-200 dark:from-slate-800 dark:to-teal-950',
  },
];

export const ProductGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Competitor & SRS Inspired Curation</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Trending Apartment Essentials
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {['ALL', 'Bedroom', 'Bathroom', 'Wall Decor', 'Home Office'].map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-xl transition duration-150 ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Media Area */}
              <div className={`relative aspect-square bg-gradient-to-br ${product.imageBg} p-6 flex items-center justify-center overflow-hidden`}>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  {product.salePrice && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow">
                      Save ৳{product.regularPrice - product.salePrice}
                    </span>
                  )}
                  {product.isPreorder && (
                    <span className="gold-gradient-badge text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow">
                      Pre-Order
                    </span>
                  )}
                  {product.spaceOptimized && (
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                      Studio Fit
                    </span>
                  )}
                </div>

                {/* Quick Action Overlay */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="p-2 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-rose-500 rounded-xl shadow-md transition">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-sky-500 rounded-xl shadow-md transition">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Placeholder Graphic */}
                <div className="text-center transform group-hover:scale-105 transition-transform duration-300">
                  <span className="text-5xl drop-shadow-md">
                    {product.category === 'Bedroom Decor' && '🛋️'}
                    {product.category === 'Bathroom Accessories' && '🧼'}
                    {product.category === 'Wall Decor' && '🕰️'}
                    {product.category === 'Home Office' && '🪑'}
                  </span>
                </div>

                {/* Barcode Tag Pill */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md text-slate-200 text-[10px] font-mono px-2.5 py-1 rounded-lg flex items-center justify-between border border-slate-700/50">
                  <span className="flex items-center gap-1">
                    <QrCode className="w-3 h-3 text-sky-400" />
                    <span>BC: {product.barcode}</span>
                  </span>
                  <span className="text-[9px] text-slate-400 uppercase">12-Digit</span>
                </div>
              </div>

              {/* Product Info Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  {product.series && (
                    <div className="text-[11px] font-medium text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1">
                      {product.series}
                    </div>
                  )}

                  <Link href={`/product/${product.id}`} className="hover:text-sky-600 dark:hover:text-sky-400 transition">
                    <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="flex items-center text-amber-400 text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold ml-1 text-slate-800 dark:text-slate-200">{product.rating}</span>
                    </div>
                    <span className="text-slate-400 text-xs">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Price & Add to Cart */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="text-xs text-slate-400 line-through">
                      {product.salePrice && `৳${product.regularPrice.toLocaleString()}`}
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-white">
                      ৳{(product.salePrice || product.regularPrice).toLocaleString()}
                    </div>
                  </div>

                  <button className="bg-sky-600 hover:bg-sky-500 text-white p-2.5 rounded-xl shadow-md shadow-sky-600/20 transition flex items-center gap-1.5 text-xs font-semibold">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
