'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKBAStore } from '@/data/store';
import { ToastContainer, ToastMessage } from '@/components/ui/Toast';
import {
  User,
  MapPin,
  Calendar,
  Briefcase,
  Phone,
  Mail,
  Link as LinkIcon,
  Camera,
  Send,
  MessageCircle,
  Share2,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Info,
} from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const router = useRouter();
  const { registerUser, loginUser } = useKBAStore();

  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Registration Form State
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    age: '',
    dailyActivity: '',
    phone: '',
    email: '',
    hasLynkId: true,
    lynkIdUsername: '',
    instagram: '',
    instagramFollowers: '',
    telegramUsername: '',
    telegramFollowers: '',
    waAverageViewers: '',
    otherSocialMedia: '',
    agreedToRules: false,
  });

  // Login Form State
  const [loginIdentity, setLoginIdentity] = useState('');

  // Success State
  const [registeredUser, setRegisteredUser] = useState<{ id: string; name: string } | null>(null);

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

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return addToast('Mohon isi Nama Lengkap Anda.', 'error');
    if (!formData.address.trim()) return addToast('Mohon isi Alamat Lengkap Anda.', 'error');
    if (!formData.age.trim()) return addToast('Mohon isi Usia Anda.', 'error');
    if (!formData.dailyActivity.trim()) return addToast('Mohon isi Aktivitas Harian Anda.', 'error');
    if (!formData.phone.trim()) return addToast('Mohon isi Nomor WhatsApp aktif.', 'error');

    if (formData.hasLynkId && !formData.lynkIdUsername.trim()) {
      return addToast('Mohon isikan Username Lynk.id Anda.', 'error');
    }

    if (!formData.agreedToRules) {
      return addToast('Anda wajib menyetujui pernyataan siap mengikuti aturan.', 'error');
    }

    const created = registerUser({
      name: formData.name.trim(),
      address: formData.address.trim(),
      age: formData.age.trim(),
      dailyActivity: formData.dailyActivity.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      hasLynkId: formData.hasLynkId,
      lynkIdUsername: formData.lynkIdUsername.toLowerCase().trim() || 'afiliator',
      instagram: formData.instagram.trim(),
      instagramFollowers: formData.instagramFollowers.trim(),
      telegramUsername: formData.telegramUsername.trim(),
      telegramFollowers: formData.telegramFollowers.trim(),
      waAverageViewers: formData.waAverageViewers.trim(),
      otherSocialMedia: formData.otherSocialMedia.trim(),
      agreedToRules: formData.agreedToRules,
    });

    setRegisteredUser({ id: created.id, name: created.name });
    addToast('Pendaftaran Afiliator KBA Berhasil!', 'success');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentity.trim()) return addToast('Mohon masukkan Nomor WhatsApp atau ID Afiliator.', 'error');

    loginUser(loginIdentity.trim());
    addToast('Selamat datang kembali di Portal Afiliasi KBA!', 'success');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-800 text-amber-400 font-extrabold text-2xl shadow-md">
            KBA
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Portal Afiliasi Kampus Bahasa Arab
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Bergabunglah menjadi bagian dari syiar edukasi bahasa Arab dan dapatkan komisi penjualan serta insentif apresiasi bulanan.
          </p>
        </div>

        {/* Success Modal Card (if just registered) */}
        {registeredUser ? (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-emerald-300 text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Ahlan wa Sahlan, {registeredUser.name}!</h2>
              <p className="text-xs sm:text-sm text-slate-600">Pendaftaran Afiliator Anda telah berhasil disetujui.</p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl max-w-sm mx-auto space-y-1 text-xs">
              <span className="text-emerald-800 font-semibold block">ID Afiliator Resmi Anda:</span>
              <span className="text-lg font-mono font-extrabold text-emerald-950 block">{registeredUser.id}</span>
            </div>

            <button
              onClick={() => router.push('/')}
              className="w-full sm:w-auto px-8 py-3 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 mx-auto shadow-md"
            >
              <span>Masuk ke Dashboard Afiliasi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden">
            {/* Tab Mode Switcher */}
            <div className="flex border-b border-slate-200 bg-slate-50/80">
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-4 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
                  authMode === 'register'
                    ? 'border-blue-800 text-blue-800 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Daftar Afiliator Baru</span>
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-4 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
                  authMode === 'login'
                    ? 'border-blue-800 text-blue-800 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Lock className="w-4 h-4 text-blue-700" />
                <span>Masuk (Login)</span>
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {/* REGISTER FORM */}
              {authMode === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-6">
                  {/* Section 1: Data Diri */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-blue-700" />
                      1. Identitas Diri Afiliator
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700">Nama Lengkap *</label>
                        <input
                          type="text"
                          required
                          placeholder="Masukkan nama lengkap Anda"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700">Usia (Tahun) *</label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: 28"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-xs sm:text-sm">
                      <label className="font-semibold text-slate-700">Alamat Lengkap *</label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Kota/Kabupaten, Provinsi & Alamat domisili"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700">Aktivitas Harian Utama *</label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Ibu Rumah Tangga, Mahasiswa, Pengajar..."
                          value={formData.dailyActivity}
                          onChange={(e) => setFormData({ ...formData, dailyActivity: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700">Nomor WhatsApp Aktif *</label>
                        <input
                          type="tel"
                          required
                          placeholder="Contoh: 08123456789"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Status Lynk.id */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                      <LinkIcon className="w-4 h-4 text-blue-700" />
                      2. Status Akun Lynk.id (Pencairan Komisi)
                    </h3>

                    <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-3 text-xs sm:text-sm">
                      <label className="font-bold text-blue-950 block">Apakah Anda sudah memiliki akun Lynk.id?</label>

                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                          <input
                            type="radio"
                            name="hasLynkId"
                            checked={formData.hasLynkId === true}
                            onChange={() => setFormData({ ...formData, hasLynkId: true })}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span>Sudah Punya</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                          <input
                            type="radio"
                            name="hasLynkId"
                            checked={formData.hasLynkId === false}
                            onChange={() => setFormData({ ...formData, hasLynkId: false, lynkIdUsername: '' })}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span>Belum Punya</span>
                        </label>
                      </div>

                      {formData.hasLynkId ? (
                        <div className="space-y-1 pt-1">
                          <label className="font-semibold text-slate-800">Username Lynk.id Anda *</label>
                          <div className="flex items-center">
                            <span className="px-3 py-2.5 bg-slate-200 text-slate-600 text-xs font-mono rounded-l-xl border border-r-0 border-slate-300">
                              lynk.id/
                            </span>
                            <input
                              type="text"
                              required
                              placeholder="username-anda"
                              value={formData.lynkIdUsername}
                              onChange={(e) => setFormData({ ...formData, lynkIdUsername: e.target.value })}
                              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-r-xl focus:ring-2 focus:ring-blue-500 outline-none text-xs sm:text-sm font-mono font-bold text-blue-900"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs leading-relaxed space-y-1">
                          <p className="font-bold flex items-center gap-1">
                            <Info className="w-3.5 h-3.5 text-amber-600" /> Catatan pendaftaran Lynk.id:
                          </p>
                          <p>
                            Anda tetap dapat mendaftar afiliasi KBA sekarang. Akun Lynk.id gratis dapat Anda buat kapan saja melalui <strong>lynk.id</strong> lalu mengisikan username-nya di menu <strong>Profil</strong> portal KBA.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section 3: Media Sosial */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                      <Share2 className="w-4 h-4 text-blue-700" />
                      3. Informasi Media Sosial & Pengikut (Reach)
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                      {/* Instagram */}
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center gap-1.5 text-pink-700 font-bold text-xs">
                          <Camera className="w-4 h-4" />
                          <span>Instagram</span>
                        </div>
                        <input
                          type="text"
                          placeholder="Nama @username IG"
                          value={formData.instagram}
                          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Jumlah Follower (contoh: 2.500)"
                          value={formData.instagramFollowers}
                          onChange={(e) => setFormData({ ...formData, instagramFollowers: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
                        />
                      </div>

                      {/* Telegram */}
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center gap-1.5 text-sky-700 font-bold text-xs">
                          <Send className="w-4 h-4" />
                          <span>Telegram</span>
                        </div>
                        <input
                          type="text"
                          placeholder="Nama @username / Channel"
                          value={formData.telegramUsername}
                          onChange={(e) => setFormData({ ...formData, telegramUsername: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Jumlah Anggota / Subscriber"
                          value={formData.telegramFollowers}
                          onChange={(e) => setFormData({ ...formData, telegramFollowers: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
                        />
                      </div>

                      {/* WhatsApp */}
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 sm:col-span-2">
                        <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp (Status Viewers Rata-rata)</span>
                        </div>
                        <input
                          type="text"
                          placeholder="Rata-rata penonton WA Status harian (contoh: 150 viewers)"
                          value={formData.waAverageViewers}
                          onChange={(e) => setFormData({ ...formData, waAverageViewers: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Rules Agreement Checkbox */}
                  <div className="pt-3 border-t border-slate-200">
                    <label className="flex items-start gap-3 p-3.5 bg-emerald-50/70 border border-emerald-300 rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreedToRules}
                        onChange={(e) => setFormData({ ...formData, agreedToRules: e.target.checked })}
                        className="mt-0.5 w-4 h-4 text-emerald-700 border-slate-300 rounded focus:ring-emerald-500"
                      />
                      <span className="text-xs sm:text-sm text-emerald-950 font-semibold leading-relaxed">
                        Saya menyatakan bersedia dan siap mengikuti seluruh aturan, kode etik kejujuran, dan ketentuan Afiliasi Kampus Bahasa Arab.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm sm:text-base rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Kirim & Selesaikan Pendaftaran</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* LOGIN FORM */}
              {authMode === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  <div className="space-y-2 text-center max-w-sm mx-auto">
                    <h3 className="font-bold text-slate-900 text-base">Masuk ke Akun Afiliator Anda</h3>
                    <p className="text-xs text-slate-500">
                      Masukkan Nomor WhatsApp terdaftar atau ID Afiliator Anda (contoh: KBA-014).
                    </p>
                  </div>

                  <div className="space-y-1 max-w-sm mx-auto text-xs sm:text-sm">
                    <label className="font-semibold text-slate-700">Nomor WA / ID Afiliator *</label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan No WA atau ID (KBA-XXX)"
                      value={loginIdentity}
                      onChange={(e) => setLoginIdentity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full max-w-sm mx-auto py-3 bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Masuk ke Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
