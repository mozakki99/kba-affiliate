'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useKBAStore } from '@/data/store';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Sparkles, Clock, Megaphone } from 'lucide-react';

export default function KampanyePage() {
  const router = useRouter();
  const { user, isLoaded, isLoggedIn } = useKBAStore();

  useEffect(() => {
    if (isLoaded && !isLoggedIn) {
      router.replace('/auth');
    }
  }, [isLoaded, isLoggedIn, router]);

  if (!isLoaded || !isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-medium">
        Memuat data kampanye...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col md:flex-row font-sans pb-20 md:pb-0">
      <DesktopSidebar user={user} />

      <main className="flex-1 flex flex-col min-w-0">
        <div className="p-4 sm:p-8 max-w-4xl w-full mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
              <Sparkles className="w-8 h-8 text-amber-500" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-black uppercase tracking-wider">
                📌 Fitur Mendatang (Segera Hadir)
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Kampanye Afiliasi
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Fitur Kampanye saat ini sedang dalam tahap pengemasan & pengembangan konsep. Nanti di halaman ini Admin dapat merilis event promo berseri dengan poin ganda dan bonus insentif spesial.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-md mx-auto text-xs text-slate-500 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Pantau pembaruan resmi di grup WhatsApp / channel Telegram KBA.</span>
            </div>
          </div>
        </div>
      </main>

      <MobileBottomNav user={user} />
    </div>
  );
}
