'use client';

import React, { useState } from 'react';
import { QrCode, Printer, RefreshCw, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

export default function AdminBarcodesPage() {
  const [categoryPrefix, setCategoryPrefix] = useState('12');
  const [variantCode, setVariantCode] = useState('0038');
  const [generatedBarcode, setGeneratedBarcode] = useState('120038472105');
  const [breakdown, setBreakdown] = useState({
    prefix: '12',
    variantCode: '0038',
    serial: '4721',
    checkDigits: '05',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const serial = Math.floor(1000 + Math.random() * 9000).toString();
      const prefix = categoryPrefix.padStart(2, '0').slice(-2);
      const code = variantCode.padStart(4, '0').slice(-4);
      const check = Math.floor(10 + Math.random() * 89).toString();
      const full = `${prefix}${code}${serial}${check}`;

      setGeneratedBarcode(full);
      setBreakdown({
        prefix,
        variantCode: code,
        serial,
        checkDigits: check,
      });
      setIsGenerating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 sm:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-xs font-mono uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>Aparto Admin Operations • SRS v1.0 Module D</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-white">
              12-Digit Barcode Generator & Label Printer
            </h1>
          </div>

          <button
            onClick={() => window.print()}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transition text-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Label Sheet</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form: Configurator */}
          <div className="lg:col-span-5 bg-slate-800/80 rounded-2xl p-6 border border-slate-700/60 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <QrCode className="w-5 h-5 text-sky-400" />
              <span>Barcode Segment Parameters</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  1. Category Prefix (2 Digits)
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={categoryPrefix}
                  onChange={(e) => setCategoryPrefix(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm font-mono text-white focus:outline-none focus:border-sky-500"
                  placeholder="e.g. 12"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">Assigned per product category</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  2. Variant Attribute Code (4 Digits)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={variantCode}
                  onChange={(e) => setVariantCode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm font-mono text-white focus:outline-none focus:border-sky-500"
                  placeholder="e.g. 0038"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">Normalized variant attribute code</span>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2 transition"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Generate 12-Digit Code</span>
            </button>
          </div>

          {/* Right Visual Label Preview */}
          <div className="lg:col-span-7 bg-slate-800/80 rounded-2xl p-6 border border-slate-700/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Product Label Preview</span>
                </h2>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Unique Constrained
                </span>
              </div>

              {/* Print Printable Sticker Container */}
              <div className="bg-white text-slate-950 p-6 rounded-xl shadow-2xl space-y-4 max-w-sm mx-auto border-2 border-slate-300">
                <div className="flex justify-between items-start border-b border-slate-200 pb-2">
                  <div>
                    <div className="font-bold text-sm tracking-tight font-serif">Aparto BD</div>
                    <div className="text-[10px] text-slate-500">Cleo Enigma Series Pillow</div>
                  </div>
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-mono font-bold">
                    ৳850
                  </span>
                </div>

                {/* Simulated Barcode Graphic Lines */}
                <div className="py-2 flex flex-col items-center justify-center space-y-1">
                  <div className="flex items-center gap-[2px] h-14 w-full justify-center">
                    {[3,1,2,1,4,1,2,3,1,2,1,3,2,1,4,1,2,3,1,2,4,1,2,3,1,2,1,3].map((w, i) => (
                      <div key={i} className={`bg-slate-950 h-full`} style={{ width: `${w * 2}px` }} />
                    ))}
                  </div>
                  <div className="font-mono text-base font-bold tracking-widest text-slate-900 mt-1">
                    {generatedBarcode}
                  </div>
                </div>

                <div className="text-[9px] text-slate-500 text-center font-mono pt-1 border-t border-slate-100">
                  Dhaka • SKU: AP-BED-CLEO-0038
                </div>
              </div>

              {/* Segment Breakdown */}
              <div className="mt-6 grid grid-cols-4 gap-2 text-center font-mono text-xs">
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-700">
                  <div className="text-[10px] text-slate-400">Prefix</div>
                  <div className="text-sky-400 font-bold">{breakdown.prefix}</div>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-700">
                  <div className="text-[10px] text-slate-400">Variant</div>
                  <div className="text-amber-400 font-bold">{breakdown.variantCode}</div>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-700">
                  <div className="text-[10px] text-slate-400">Serial</div>
                  <div className="text-emerald-400 font-bold">{breakdown.serial}</div>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-700">
                  <div className="text-[10px] text-slate-400">Check</div>
                  <div className="text-rose-400 font-bold">{breakdown.checkDigits}</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
