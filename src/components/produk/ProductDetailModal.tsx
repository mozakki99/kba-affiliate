'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { copyToClipboard } from '@/lib/utils';
import {
  X,
  Copy,
  Check,
  Info,
  CheckCircle2,
  HelpCircle,
  Send,
  BookOpen,
  FileText,
  Sparkles,
  Calculator,
  TrendingUp,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  userLynkId: string;
  onClose: () => void;
  onShowToast: (text: string, type: 'success' | 'error' | 'info') => void;
}

export function ProductDetailModal({ product, userLynkId, onClose, onShowToast }: ProductDetailModalProps) {
  if (!product) return null;

  const lynkUrl = `https://lynk.id/${userLynkId || 'ahmad'}/${product.slug}`;
  const telegramUrl = product.telegramChannelUrl || 'https://t.me/materi_kba_official_private';

  const [activeTab, setActiveTab] = useState<'knowledge' | 'copywriting'>('knowledge');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [closingCount, setClosingCount] = useState<number>(10);

  const priceVal = product.priceNumber || 99000;
  const commVal = product.commissionNumber || 35000;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const handleCopyLynkUrl = async () => {
    const ok = await copyToClipboard(lynkUrl);
    if (ok) {
      onShowToast('Link Lynk.id produk disalin!', 'success');
    }
  };

  const handleCopyCopywriting = async (id: string, content: string) => {
    const fullText = `${content}\n\nAmankan promonya di sini: ${lynkUrl}`;
    const ok = await copyToClipboard(fullText);
    if (ok) {
      setCopiedId(id);
      onShowToast('Narasi iklan + Link Lynk.id disalin!', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-blue-900 text-white flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-800 text-amber-300 border border-blue-700 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                {product.category}
              </span>
              <span className="bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full">
                {product.availabilityStatus}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold leading-snug">{product.title}</h2>
            <p className="text-xs text-slate-300 mt-1">Product Knowledge & Narasi Iklan Evergreen</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-blue-950/80 hover:bg-blue-800 text-slate-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="p-4 bg-sky-50 border-b border-sky-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sky-950">Link Lynk.id Anda:</span>
            <span className="font-mono font-bold text-blue-900">{lynkUrl}</span>
            <button
              onClick={handleCopyLynkUrl}
              className="p-1 hover:bg-sky-100 text-blue-700 rounded"
              title="Salin Link"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg flex items-center gap-1 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Materi Gambar Telegram ↗</span>
          </a>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 shrink-0">
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'knowledge'
                ? 'border-blue-700 text-blue-800'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Product Knowledge
          </button>
          <button
            onClick={() => setActiveTab('copywriting')}
            className={`py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'copywriting'
                ? 'border-blue-700 text-blue-800'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            Narasi Iklan Umum (Bebas Post Kapan Saja)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-slate-800">
          {activeTab === 'knowledge' && (
            <div className="space-y-6">
              {/* Target & Pricing Card */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <p className="text-slate-500 font-medium">Target Pembeli Ideal (Market Fit):</p>
                  <p className="font-semibold text-slate-900 mt-1">{product.targetAudience}</p>
                </div>
                <div className="space-y-1.5 sm:border-l sm:border-slate-200 sm:pl-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Harga Resmi:</span>
                    <span className="font-bold text-slate-900">{product.priceSample}</span>
                  </div>
                  <div className="flex justify-between text-emerald-800">
                    <span className="font-medium">Komisi / Penjualan:</span>
                    <span className="font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-200">
                      {product.commissionSample}
                    </span>
                  </div>
                  {product.commissionTenSales && (
                    <div className="flex justify-between text-blue-900 font-bold pt-1 border-t border-slate-200">
                      <span>Estimasi 10 Penjualan:</span>
                      <span className="text-blue-950 font-extrabold">🎁 {product.commissionTenSales}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive Commission Calculator Widget */}
              <div className="p-4 sm:p-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-xl border border-blue-800 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-400 shrink-0" />
                    <h3 className="font-bold text-sm sm:text-base text-white">Simulasi Hitung Komisi Closing</h3>
                  </div>
                  <span className="text-[10px] uppercase font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                    Kalkulator Interaktif
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <label className="text-slate-300 font-medium">Bila Berhasil Closing Berapa Produk?</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="1000"
                        value={closingCount}
                        onChange={(e) => setClosingCount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-24 px-3 py-1.5 bg-slate-800 border border-slate-600 rounded-lg text-white text-right font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      <span className="text-slate-300 font-medium">Penjualan</span>
                    </div>
                  </div>

                  {/* Quick Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-slate-400 mr-1">Preset Cepat:</span>
                    {[1, 5, 10, 20, 50, 100].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setClosingCount(preset)}
                        className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors ${
                          closingCount === preset
                            ? 'bg-amber-400 text-slate-950 shadow-xs'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        }`}
                      >
                        {preset}x Closing
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation Result Display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                    <span className="text-[11px] text-slate-400 block">Total Omset Penjualan:</span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-200 font-mono">
                      {formatRupiah(closingCount * priceVal)}
                    </span>
                  </div>
                  <div className="bg-emerald-950/80 p-3.5 rounded-lg border border-emerald-500/50">
                    <span className="text-[11px] text-emerald-300 block font-semibold">Estimasi Komisi Bersih Anda:</span>
                    <span className="text-base sm:text-xl font-extrabold text-emerald-300 font-mono">
                      {formatRupiah(closingCount * commVal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Manfaat Utama */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider">
                  Keunggulan & Manfaat Utama Produk
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Isi Produk */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider">
                  Daftar Isi / Silabus Produk
                </h3>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-1.5 font-mono">
                  {product.contents.map((item, idx) => (
                    <p key={idx} className="text-slate-800">
                      • {item}
                    </p>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              {product.faq.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-blue-700" />
                    FAQ (Jawaban Pertanyaan Pembeli)
                  </h3>
                  <div className="space-y-2">
                    {product.faq.map((faq, i) => (
                      <div key={i} className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-xs sm:text-sm space-y-1">
                        <p className="font-bold text-blue-950">Q: {faq.question}</p>
                        <p className="text-slate-700">A: {faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'copywriting' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Bebas Diposting Kapan Saja:</strong> Gunakan narasi iklan umum ini di Status WA / IG Story Anda kapan pun Anda ingin promosi.
                </span>
              </div>

              {(!product.generalCopywriting || product.generalCopywriting.length === 0) ? (
                <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                  Gunakan caption dari Telegram Channel untuk materi narasi produk ini.
                </div>
              ) : (
                <div className="space-y-4">
                  {product.generalCopywriting.map((copy) => (
                    <div key={copy.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">{copy.title}</h4>
                        <button
                          onClick={() => handleCopyCopywriting(copy.id, copy.content)}
                          className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg flex items-center gap-1"
                        >
                          {copiedId === copy.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === copy.id ? 'Tersalin!' : 'Salin Narasi + Link'}</span>
                        </button>
                      </div>

                      <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed">
                        {copy.content}
                        <div className="mt-2 pt-2 border-t border-slate-100 font-bold text-blue-900">
                          {lynkUrl}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
