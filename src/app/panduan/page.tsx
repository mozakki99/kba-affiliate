'use client';

import React from 'react';
import { useKBAStore } from '@/data/store';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import {
  BookOpen,
  Award,
  Gift,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Zap,
  Target,
  FileText,
  Share2,
  DollarSign,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function PanduanPage() {
  const { user, isLoaded } = useKBAStore();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-medium">
        Memuat panduan...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col md:flex-row font-sans pb-20 md:pb-0">
      <DesktopSidebar user={user} />

      <main className="flex-1 flex flex-col min-w-0">

        <div className="p-4 sm:p-8 max-w-5xl w-full mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-700" />
                Panduan Afiliator & Aturan Perpoinan KBA
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Panduan lengkap alur kerja afiliasi, sistem perpoinan keaktifan, rumus pembagian insentif bulanan, dan tutorial promosi.
              </p>
            </div>
          </div>

          {/* Quick Steps Tutorial */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-900 text-white p-5 sm:p-6 rounded-2xl shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <h2 className="text-base sm:text-lg font-bold">Tutorial 5 Langkah Praktis Afiliator KBA</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              <div className="bg-white/10 p-3 rounded-xl border border-white/15 space-y-1">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-extrabold flex items-center justify-center text-[11px] mb-1">
                  1
                </span>
                <p className="font-bold text-amber-300">Set Username Lynk.id</p>
                <p className="text-slate-200 text-[11px] leading-relaxed">
                  Isi username Lynk.id Anda di menu <strong>Profil</strong> agar link komisi Anda siap digunakan.
                </p>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/15 space-y-1">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-extrabold flex items-center justify-center text-[11px] mb-1">
                  2
                </span>
                <p className="font-bold text-amber-300">Ambil Naskah Promo</p>
                <p className="text-slate-200 text-[11px] leading-relaxed">
                  Buka menu <strong>Produk & Materi</strong> atau <strong>Tugas Harian</strong> untuk menyalin naskah iklan default.
                </p>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/15 space-y-1">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-extrabold flex items-center justify-center text-[11px] mb-1">
                  3
                </span>
                <p className="font-bold text-amber-300">Posting ke Media Sosial</p>
                <p className="text-slate-200 text-[11px] leading-relaxed">
                  Publikasikan naskah + link Lynk.id Anda ke IG Story, WA Status, Grup WA, atau Telegram.
                </p>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/15 space-y-1">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-extrabold flex items-center justify-center text-[11px] mb-1">
                  4
                </span>
                <p className="font-bold text-amber-300">Absensi & Input Viewers</p>
                <p className="text-slate-200 text-[11px] leading-relaxed">
                  Centang pernyataan kejujuran dan input jumlah viewers hari itu sebelum jam 23:59 WIB.
                </p>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/15 space-y-1">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-extrabold flex items-center justify-center text-[11px] mb-1">
                  5
                </span>
                <p className="font-bold text-amber-300">Klaim Komisi & Insentif</p>
                <p className="text-slate-200 text-[11px] leading-relaxed">
                  Dapatkan komisi closing Lynk.id + bagian insentif bulanan Rp 150.000 untuk Top 10 Afiliator.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Detailed Points Rules */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Zap className="w-5 h-5 text-amber-500 shrink-0" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Aturan Lengkap Akumulasi Poin Keaktifan
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/90 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>1. Poin Rajin Posting (+10 Poin / Tugas)</span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">
                  Diperoleh secara langsung setelah Anda mengonfirmasi absensi tugas harian yang dirilis KBA. Poin ini menjadi penghargaan atas konsistensi & kerajinan Anda.
                </p>
              </div>

              <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200/90 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-bold">
                  <Award className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>2. Poin Bonus Viewers (10 Viewers = 1 Poin)</span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">
                  Jumlah penonton postingan Anda dikonversi dengan rasio <strong>10 Viewers = 1 Poin</strong>. Untuk menjaga persaingan yang sehat, poin penonton dibatasi maksimal <strong>+200 Poin per tugas</strong>.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Sistem Kejujuran & Amanah:</strong>
                <p className="mt-0.5">
                  Sebelum mengirimkan klaim poin, setiap afiliator wajib menyetujui centang <em>Pernyataan Kejujuran</em> bahwa data absensi dan jumlah penonton diisi dengan sungguh-sungguh tanpa rekayasa.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Fair Proportional Incentive Calculation */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Gift className="w-5 h-5 text-emerald-600 shrink-0" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Sistem Pembagian Insentif Bulanan Rp 150.000 (Otomatis & Adil)
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Kampus Bahasa Arab menyediakan alokasi apresiasi sebesar <strong>Rp 150.000 per bulan</strong> untuk 10 Afiliator Teraktif. Sistem menghitung porsi insentif setiap peserta secara otomatis menggunakan rumus proporsional:
            </p>

            <div className="p-4 bg-slate-900 text-white rounded-xl text-center space-y-2 font-mono text-xs sm:text-sm">
              <p className="text-amber-400 font-bold text-sm sm:text-base">
                Insentif Anda = (Poin Anda ÷ Total Poin Top 10) × Rp 150.000
              </p>
              <p className="text-slate-400 text-[11px]">
                Diperlengkapi batas maksimum (Hard Cap Rp 45.000 / orang) agar insentif terdistribusi merata & tidak dimonopoli.
              </p>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">Simulasi Contoh Perhitungan:</h3>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 font-mono text-xs">
                <p>• Total Poin Top 10 = 3.465 Poin | Anggaran Bulanan = Rp 150.000</p>
                <p>• <strong>Juara 1 (680 Poin)</strong>: (680 ÷ 3.465) × 150.000 = <strong>Rp 29.437</strong></p>
                <p>• <strong>Juara 2 (510 Poin)</strong>: (510 ÷ 3.465) × 150.000 = <strong>Rp 22.078</strong></p>
                <p>• <strong>Juara 3 (420 Poin)</strong>: (420 ÷ 3.465) × 150.000 = <strong>Rp 18.182</strong></p>
              </div>
            </div>
          </div>

          {/* Section 3: FAQ */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <HelpCircle className="w-5 h-5 text-blue-700 shrink-0" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Pertanyaan Sering Diajukan (FAQ Afiliator)
              </h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <p className="font-bold text-blue-950">Q: Kapan jumlah viewers harus diisikan?</p>
                <p className="text-slate-700 leading-relaxed">
                  A: Jumlah penonton diisikan pada hari yang sama saat tugas dirilis, maksimal sebelum jam <strong>23:59 WIB</strong>.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <p className="font-bold text-blue-950">Q: Apakah komisi penjualan Lynk.id berbeda dengan insentif bulanan?</p>
                <p className="text-slate-700 leading-relaxed">
                  A: Ya! Komisi penjualan Lynk.id langsung masuk ke akun Lynk.id Anda dari setiap closing. Sedangkan insentif bulanan Rp 150.000 adalah hadiah tambahan khusus afiliator teraktif KBA.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <p className="font-bold text-blue-950">Q: Di mana saya bisa melihat estimasi komisi jika closing 10 buku?</p>
                <p className="text-slate-700 leading-relaxed">
                  A: Buka menu <strong>Materi Produk</strong>, klik tombol <em>Detail Produk</em> pada produk pilihan Anda, lalu manfaatkan fitur <strong>Simulasi Hitung Komisi Closing</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Quick CTA */}
          <div className="p-5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">Siap Memulai Promosi Hari Ini?</h3>
              <p className="text-xs sm:text-sm font-medium opacity-90">
                Lihat daftar tugas harian Anda dan mulai posting naskah promosi sekarang!
              </p>
            </div>
            <Link
              href="/tugas"
              className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1.5 shadow-md"
            >
              <span>Buka Tugas Harian</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <MobileBottomNav user={user} />
    </div>
  );
}
