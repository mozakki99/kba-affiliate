'use client';

import React from 'react';
import { Product } from '@/types';
import { BookOpen, ArrowRight, Send } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export function ProductCard({ product, onOpenDetail }: ProductCardProps) {
  const getCategoryColor = (cat: Product['category']) => {
    switch (cat) {
      case 'Kelas':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Ebook & Kamus':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Produk digital lainnya':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Materi gratis':
        return 'bg-amber-50 text-amber-900 border-amber-300';
    }
  };

  const telegramUrl = product.telegramChannelUrl || 'https://t.me/materi_kba_official_private';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-md">
      <div>
        {/* Category & Status Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${getCategoryColor(product.category)}`}>
            {product.category}
          </span>
          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
            {product.availabilityStatus}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug mb-2 hover:text-blue-800 transition-colors">
          {product.title}
        </h3>

        {/* Target Audience */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {product.targetAudience}
        </p>

        {/* Price, Commission per Sale & 10 Sales Estimation */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/90 mb-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Harga Resmi:</span>
            <span className="font-bold text-slate-900">{product.priceSample}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-emerald-800 font-medium">
            <span>Komisi / Penjualan:</span>
            <span className="font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-200">
              {product.commissionSample}
            </span>
          </div>
          {product.commissionTenSales && (
            <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs font-semibold text-blue-900">
              <span>Estimasi 10 Closing:</span>
              <span className="bg-blue-100 text-blue-950 px-2 py-0.5 rounded font-extrabold border border-blue-200">
                🎁 {product.commissionTenSales}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <a
          href={telegramUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-bold text-sky-800 hover:underline flex items-center justify-center sm:justify-start gap-1 py-1"
        >
          <Send className="w-3.5 h-3.5 text-sky-600 shrink-0" />
          <span>Materi Telegram</span>
        </a>
        <button
          onClick={() => onOpenDetail(product)}
          className="w-full sm:w-auto px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>Detail Produk</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </button>
      </div>
    </div>
  );
}
