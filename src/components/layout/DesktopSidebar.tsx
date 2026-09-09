'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Megaphone, Package, Trophy, UserCheck, BookOpen, UserPlus, LogOut, ShieldCheck } from 'lucide-react';
import { AffiliateUser } from '@/types';
import { useKBAStore } from '@/data/store';

interface DesktopSidebarProps {
  user: AffiliateUser;
}

export function DesktopSidebar({ user }: DesktopSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logoutUser } = useKBAStore();

  const handleLogout = () => {
    logoutUser();
    router.push('/auth');
  };

  const navItems = [
    { href: '/', label: 'Beranda', icon: Home },
    { href: '/kampanye', label: 'Kampanye Diskon', icon: Megaphone },
    { href: '/produk', label: 'Produk & Materi', icon: Package },
    { href: '/peringkat', label: 'Peringkat Rajin', icon: Trophy },
    { href: '/panduan', label: 'Panduan & Tutorial', icon: BookOpen },
    { href: '/profil', label: 'Profil & Lynk.id', icon: UserCheck },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 min-h-screen sticky top-0 h-screen z-30">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-800 flex items-center justify-center text-amber-400 font-bold text-lg shadow-sm">
          KBA
        </div>
        <div>
          <h1 className="font-bold text-slate-900 leading-tight">Afiliasi KBA</h1>
          <p className="text-xs text-slate-500">Kampus Bahasa Arab</p>
        </div>
      </div>

      {/* User Info Quick View */}
      <div className="p-4 mx-4 my-4 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-700 text-white font-semibold flex items-center justify-center text-sm shadow">
          {user.name.charAt(0)}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
          <span className="inline-block bg-amber-100 text-amber-800 text-[11px] font-mono font-medium px-2 py-0.5 rounded">
            ID: {user.id}
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-800 border border-blue-200/60 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info & Action Buttons */}
      <div className="p-4 border-t border-slate-100 text-xs text-slate-400 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors font-bold text-xs shadow-xs cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-rose-600 shrink-0" />
          <span>Keluar Akun (Logout)</span>
        </button>

        <Link
          href="/admin"
          className="flex items-center justify-center gap-2 p-2 bg-slate-900 text-amber-400 rounded-xl hover:bg-slate-800 transition-colors font-bold text-xs shadow-sm"
        >
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Portal Admin (Kelola)</span>
        </Link>

        <div className="space-y-0.5 pt-1 text-center sm:text-left">
          <p className="font-medium text-slate-500">KBA Affiliate Portal v2.0</p>
          <p>Lynk.id: {user.lynkIdUsername}</p>
        </div>
      </div>
    </aside>
  );
}

