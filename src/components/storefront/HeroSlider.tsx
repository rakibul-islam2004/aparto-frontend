'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Sparkles, Filter } from 'lucide-react';

export const HeroSlider: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-16 lg:py-24">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 text-sky-300 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Designed for Modern Urban Apartments in Bangladesh</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Transform Your Space into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-amber-300">Sanctuary of Style.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Curated Nordic-inspired decor, space-saving storage, luxury bed series, and bath accessories crafted for compact & luxury apartment living.
            </p>

            {/* Quick Apartment Filter Selector */}
            <div className="bg-slate-800/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Filter className="w-3.5 h-3.5 text-sky-400" />
                <span>Filter by Apartment Setup:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Studio Apartment', tag: 'compact' },
                  { label: '1-Bedroom Pack', tag: '1bed' },
                  { label: '2-Bedroom Luxury', tag: '2bed' },
                  { label: 'Wall-Mounted Only', tag: 'wall' },
                  { label: 'Foldable Furniture', tag: 'fold' },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/shop?filter=${item.tag}`}
                    className="text-xs bg-slate-700/60 hover:bg-sky-600 hover:text-white text-slate-200 px-3 py-1.5 rounded-lg border border-slate-600/50 transition duration-150 font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/shop"
                className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition group"
              >
                <span>Shop New Collections</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/collections/cleo-enigma"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-100 font-semibold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <span>Explore Cleo Enigma Series</span>
              </Link>
            </div>

            {/* BD Trust Badge Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-slate-300 text-xs">
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <div className="font-semibold text-white">Cash on Delivery</div>
                  <div className="text-[11px] text-slate-400">All 64 BD Districts</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-semibold text-white">100% Guaranteed</div>
                  <div className="text-[11px] text-slate-400">Quality Checked</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="font-semibold text-white">Easy Returns</div>
                  <div className="text-[11px] text-slate-400">3-Day Replacement</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Showcase Cards (Inspired by Home & Beyond / Metaphor BD) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            {/* Card 1: Cleo Enigma Series */}
            <div className="group relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-800 aspect-[4/5] hover:border-sky-500/50 transition">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10" />
              <div className="absolute top-3 left-3 z-20">
                <span className="gold-gradient-badge text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow">
                  Best Seller
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <span className="text-[11px] text-sky-300 font-mono">Series #01</span>
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-sky-300 transition">
                  Cleo Enigma Velvet Covers
                </h3>
                <p className="text-slate-300 text-xs mt-1">Starting ৳850</p>
              </div>
            </div>

            {/* Card 2: Heritage Soap & Towels */}
            <div className="group relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-800 aspect-[4/5] hover:border-amber-500/50 transition">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10" />
              <div className="absolute top-3 left-3 z-20">
                <span className="bg-sky-500 text-slate-950 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow">
                  Bath Luxury
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <span className="text-[11px] text-amber-300 font-mono">Series #02</span>
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition">
                  Heritage Bath & Towels
                </h3>
                <p className="text-slate-300 text-xs mt-1">Set of 3 ৳1,950</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
