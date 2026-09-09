'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useKBAStore } from '@/data/store';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { ProductCard } from '@/components/produk/ProductCard';
import { ProductDetailModal } from '@/components/produk/ProductDetailModal';
import { ToastContainer, ToastMessage } from '@/components/ui/Toast';
import { Product } from '@/types';
import { Package, Search, Filter } from 'lucide-react';

export default function ProdukPage() {
  const router = useRouter();
  const { user, isLoggedIn, products, isLoaded, resetDemoState } = useKBAStore();

  useEffect(() => {
    if (isLoaded && !isLoggedIn) {
      router.replace('/auth');
    }
  }, [isLoaded, isLoggedIn, router]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'error' | 'info') => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-medium">
        Memuat produk...
      </div>
    );
  }

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['Semua', 'Kelas', 'Ebook & Kamus', 'Produk digital lainnya', 'Materi gratis'];

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col md:flex-row font-sans pb-20 md:pb-0">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
      <DesktopSidebar user={user} />

      <main className="flex-1 flex flex-col min-w-0">

        <div className="p-4 sm:p-8 max-w-5xl w-full mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <Package className="w-6 h-6 text-blue-700" />
                Materi Produk, Narasi Iklan & Simulasi Komisi
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Pusat Product Knowledge resmi KBA, naskah iklan default, harga bersih, estimasi komisi 10 penjualan, dan kalkulator simulasi closing.
              </p>
            </div>
          </div>

          {/* Search Bar & Category Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari produk KBA (misal: Umrah, Ammiyah, Kamus, Kitab)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Kategori:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-800 text-white border-blue-800 font-semibold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-12 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
              <p className="font-bold text-slate-700">Produk tidak ditemukan</p>
              <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian atau kategori filter Anda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onOpenDetail={(p) => setSelectedProduct(p)} />
              ))}
            </div>
          )}
        </div>
      </main>

      <MobileBottomNav user={user} />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          userLynkId={user.lynkIdUsername}
          onClose={() => setSelectedProduct(null)}
          onShowToast={addToast}
        />
      )}
    </div>
  );
}
