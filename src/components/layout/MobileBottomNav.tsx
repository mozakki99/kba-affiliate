'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, Trophy, MoreHorizontal, Megaphone, UserCheck, X, BookOpen, UserPlus } from 'lucide-react';
import { AffiliateUser } from '@/types';

interface MobileBottomNavProps {
  user: AffiliateUser;
}

export function MobileBottomNav({ user }: MobileBottomNavProps) {
  const pathname = usePathname();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainItems = [
    { href: '/', label: 'Beranda', icon: Home },
    { href: '/produk', label: 'Produk & Materi', icon: Package },
    { href: '/peringkat', label: 'Peringkat Rajin', icon: Trophy },
  ];

  const secondaryItems = [
    { href: '/auth', label: 'Daftar / Login Akun', icon: UserPlus, description: 'Registrasi afiliator baru atau masuk akun' },
    { href: '/panduan', label: 'Panduan & Tutorial', icon: BookOpen, description: 'Sistem perpoinan, aturan insentif & tutorial' },
    { href: '/kampanye', label: 'Kampanye Diskon', icon: Megaphone, description: 'Event promo terbatas diskon khusus' },
    { href: '/profil', label: 'Profil & Lynk.id', icon: UserCheck, description: 'Pengaturan username Lynk.id Anda' },
  ];

  return (
    <>
      {/* Bottom Nav Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {mainItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setShowMoreMenu(false)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[11px] font-medium transition-colors ${
                isActive ? 'text-blue-800 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Lainnya Button */}
        <button
          onClick={() => setShowMoreMenu(!showMoreMenu)}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[11px] font-medium transition-colors ${
            showMoreMenu || pathname === '/kampanye' || pathname === '/profil' || pathname === '/panduan'
              ? 'text-blue-800 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <MoreHorizontal
            className={`w-5 h-5 mb-0.5 ${
              showMoreMenu || pathname === '/kampanye' || pathname === '/profil' || pathname === '/panduan' ? 'text-blue-700' : 'text-slate-400'
            }`}
          />
          <span>Lainnya</span>
        </button>
      </nav>

      {/* Drawer / Modal Menu Lainnya */}
      {showMoreMenu && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setShowMoreMenu(false)}
          />
          <div className="relative bg-white rounded-t-2xl p-5 border-t border-slate-200 shadow-2xl z-10 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-semibold flex items-center justify-center text-xs">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                  <p className="text-xs text-amber-700 font-mono font-medium">ID: {user.id}</p>
                </div>
              </div>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigasi Lainnya</p>
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setShowMoreMenu(false)}
                    className={`flex items-start gap-3.5 p-3 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-blue-50 border-blue-200 text-blue-900 font-semibold'
                        : 'bg-slate-50/70 border-slate-200/80 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-blue-100/70 text-blue-800 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
