'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { HeroSlider } from '@/components/storefront/HeroSlider';
import { ProductGrid } from '@/components/storefront/ProductGrid';
import { Truck, ShieldCheck, CreditCard, Clock, Phone, Mail, MapPin, Building2, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Hero Section */}
      <main className="flex-grow">
        <HeroSlider />

        {/* Competitor Banner Strip */}
        <section className="bg-sky-900 text-white py-4 px-4 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-3">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Curated Home Decor & Compact Apartment Accessories • Bangladesh Sector Configured</span>
          <Link href="/admin/barcodes" className="underline hover:text-amber-300 font-bold ml-2">
            Try 12-Digit Barcode Engine →
          </Link>
        </section>

        {/* 3. Trending Product Grid & Series Showcase */}
        <ProductGrid />

        {/* 4. Room-by-Room Inspiration Section */}
        <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider">
                Explore by Apartment Room
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                Every Corner, Perfectly Tailored.
              </h2>
              <p className="text-slate-500 text-sm">
                From compact balcony gardens to luxury bedroom accents, elevate your Dhaka apartment lifestyle.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Bathroom Sanctuary', desc: 'Heritage dispenser sets, absorbent towel bundles & organizer racks', bg: 'from-sky-500 to-teal-600', icon: '🛁' },
                { title: 'Bedroom Comfort', desc: 'Cleo Enigma velvet covers, throws & ambient nightstand lighting', bg: 'from-amber-500 to-rose-600', icon: '🛏️' },
                { title: 'Living Room Elegance', desc: 'Nordic wall clocks, table runners & accent cushion covers', bg: 'from-slate-700 to-slate-900', icon: '🛋️' },
              ].map((room, idx) => (
                <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-lg p-8 bg-gradient-to-br text-white hover:shadow-2xl transition duration-300">
                  <div className="text-4xl mb-4">{room.icon}</div>
                  <h3 className="font-serif text-2xl font-bold mb-2">{room.title}</h3>
                  <p className="text-xs text-slate-100 opacity-90 leading-relaxed mb-6">{room.desc}</p>
                  <Link href="/shop" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-white hover:underline">
                    Explore Collection →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 5. Footer */}
      <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold text-white">Aparto BD</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Bangladesh’s premier configurable apartment accessories ecommerce platform. Quality home decor & compact space solutions.
            </p>
          </div>

           {/* Quick Links */}
           <div>
             <h4 className="font-bold text-white uppercase tracking-wider mb-4">Shop Categories</h4>
             <ul className="space-y-2.5 text-slate-400">
               <li><Link href="/categories/bathroom" className="hover:text-sky-400 transition">Bathroom Accessories</Link></li>
               <li><Link href="/categories/bedroom" className="hover:text-sky-400 transition">Bedroom Decor</Link></li>
               <li><Link href="/categories/living-room" className="hover:text-sky-400 transition">Living Room</Link></li>
               <li><Link href="/categories/storage" className="hover:text-sky-400 transition">Storage Solutions</Link></li>
             </ul>
           </div>

           {/* Customer Service */}
           <div>
             <h4 className="font-bold text-white uppercase tracking-wider mb-4">Customer Care</h4>
             <ul className="space-y-2.5 text-slate-400">
               <li><Link href="/track-order" className="hover:text-sky-400 transition">Track Shipment</Link></li>
               <li><Link href="/faq" className="hover:text-sky-400 transition">FAQ</Link></li>
               <li><Link href="/contact" className="hover:text-sky-400 transition">Contact Us</Link></li>
               <li><Link href="/terms" className="hover:text-sky-400 transition">Terms of Service</Link></li>
             </ul>
           </div>

          {/* Contact & Payment logos */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">BD Logistics & Support</h4>
            <div className="flex items-center gap-2 text-slate-400">
              <Phone className="w-4 h-4 text-sky-400" />
              <span>+880 1700-000000 (10 AM - 8 PM)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>support@aparto.com.bd</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Gulshan 2, Dhaka 1212, Bangladesh</span>
            </div>
            <div className="pt-2">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-semibold">Integrations</div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
                <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">SSLCommerz</span>
                <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">ShurjoPay</span>
                <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">Steadfast</span>
                <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">Pathao</span>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>© 2026 Aparto BD. Neurosoftic Configurable Platform Engine. All Rights Reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
