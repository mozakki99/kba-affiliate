'use client';

import React, { useState } from 'react';
import { useKBAStore } from '@/data/store';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { DemoBadge } from '@/components/layout/DemoBadge';
import { ToastContainer, ToastMessage } from '@/components/ui/Toast';
import { copyToClipboard } from '@/lib/utils';
import {
  UserCheck,
  Link as LinkIcon,
  Save,
  Check,
  Copy,
  Info,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export default function ProfilPage() {
  const {
    user,
    products,
    isLoaded,
    updateUserProfile,
    resetDemoState,
  } = useKBAStore();

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Profile Form state
  const [nameInput, setNameInput] = useState(user.name);
  const [lynkIdUsernameInput, setLynkIdUsernameInput] = useState(user.lynkIdUsername);
  const [phoneInput, setPhoneInput] = useState(user.phone);
  const [instagramInput, setInstagramInput] = useState(user.instagram);
  const [tiktokInput, setTiktokInput] = useState(user.tiktok);
  const [waGroupInput, setWaGroupInput] = useState(user.waGroup);

  const [copiedId, setCopiedId] = useState<string | null>(null);

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
        Memuat profil...
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      addToast('Nama afiliator tidak boleh kosong', 'error');
      return;
    }
    if (!lynkIdUsernameInput.trim()) {
      addToast('Username Lynk.id tidak boleh kosong', 'error');
      return;
    }

    updateUserProfile(
      nameInput,
      lynkIdUsernameInput,
      phoneInput,
      instagramInput,
      tiktokInput,
      waGroupInput
    );
    addToast('Profil & Link Lynk.id Anda berhasil diperbarui!', 'success');
  };

  const handleCopyLink = async (id: string, text: string) => {
    if (!text) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedId(id);
      addToast('Link Lynk.id disalin ke clipboard!', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col md:flex-row font-sans pb-20 md:pb-0">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
      <DesktopSidebar user={user} />

      <main className="flex-1 flex flex-col min-w-0">
        <DemoBadge onResetDemo={resetDemoState} />

        <div className="p-4 sm:p-8 max-w-5xl w-full mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-blue-700" />
                Profil & Pengaturan Lynk.id
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Atur username Lynk.id Anda sekali saja. Semua link produk & materi promosi akan otomatis dibuat.
              </p>
            </div>
          </div>

          {/* Lynk.id Integration Notice Banner */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-950 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-blue-900">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
              Sistem Terintegrasi Lynk.id Serba Otomatis:
            </div>
            <p className="text-blue-900 opacity-90 leading-relaxed">
              Cukup masukkan **Username Lynk.id** Anda di bawah (misal: <code>ahmad</code>). Aplikasi KBA Affiliate akan otomatis merangkai link afiliasi untuk setiap produk (<code>https://lynk.id/ahmad/ebook-umrah</code>). Anda tidak perlu merangkai link satu per satu!
            </p>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSaveProfile} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <h2 className="font-bold text-base sm:text-lg text-slate-900 border-b border-slate-100 pb-3">
              Data Afiliator & Username Lynk.id
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ID Afiliator KBA (Tetap)</label>
                <input
                  type="text"
                  disabled
                  value={user.id}
                  className="w-full p-2.5 bg-slate-100 font-mono font-bold text-amber-800 border border-slate-200 rounded-xl cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Tampilan Afiliator</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Lynk.id Username */}
              <div className="sm:col-span-2 bg-blue-50/70 p-4 rounded-xl border border-blue-200">
                <label className="block font-extrabold text-blue-950 mb-1">
                  Username Lynk.id Pribadi Anda
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-mono text-slate-500 font-bold bg-white p-2.5 rounded-xl border border-slate-300">
                    lynk.id/
                  </span>
                  <input
                    type="text"
                    placeholder="username-anda"
                    value={lynkIdUsernameInput}
                    onChange={(e) => setLynkIdUsernameInput(e.target.value)}
                    className="flex-1 p-2.5 font-mono font-bold text-blue-900 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <p className="text-[11px] text-blue-800 mt-1">
                  Contoh: Jika username Lynk.id Anda adalah <strong>ahmad</strong>, link Anda menjadi <code>lynk.id/ahmad/ebook-umrah</code>.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nomor WhatsApp Status</label>
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Username Instagram</label>
                <input
                  type="text"
                  value={instagramInput}
                  onChange={(e) => setInstagramInput(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Username Lynk.id</span>
              </button>
            </div>
          </form>

          {/* Generated Product Links Table */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <h2 className="font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-blue-700" />
              Link Afiliasi Lynk.id Otomatis Per Produk
            </h2>

            <div className="space-y-3">
              {products.map((product) => {
                const lynkUrl = `https://lynk.id/${user.lynkIdUsername || 'ahmad'}/${product.slug}`;

                return (
                  <div
                    key={product.id}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-slate-900 mt-1">{product.title}</h3>
                      <p className="font-mono text-blue-700 font-medium text-xs mt-0.5">{lynkUrl}</p>
                    </div>

                    <button
                      onClick={() => handleCopyLink(product.id, lynkUrl)}
                      className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-blue-50 hover:text-blue-800 text-slate-700 font-semibold rounded-lg flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
                    >
                      {copiedId === product.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedId === product.id ? 'Tersalin!' : 'Salin Link'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <MobileBottomNav user={user} />
    </div>
  );
}
