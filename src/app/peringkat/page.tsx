'use client';

import React, { useState } from 'react';
import { useKBAStore } from '@/data/store';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Trophy, Award, ShoppingBag, Info, Gift, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PeringkatPage() {
  const { user, leaderboardActivity, leaderboardSales, isLoaded, resetDemoState } = useKBAStore();

  const [activeTab, setActiveTab] = useState<'Keaktifan' | 'Penjualan'>('Keaktifan');
  const [selectedMonth, setSelectedMonth] = useState<string>('September');
  const [selectedYear, setSelectedYear] = useState<string>('2026');

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const years = ['2026', '2025', '2024'];

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-medium">
        Memuat peringkat...
      </div>
    );
  }

  const currentData = activeTab === 'Keaktifan' ? leaderboardActivity : leaderboardSales;
  const userEntry = currentData.find((d) => d.isCurrentUser);

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col md:flex-row font-sans pb-20 md:pb-0">
      <DesktopSidebar user={user} />

      <main className="flex-1 flex flex-col min-w-0">

        <div className="p-4 sm:p-8 max-w-5xl w-full mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-500" />
                Peringkat & Apresiasi Afiliator
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Klasemen keaktifan promosi harian dan hasil penjualan terverifikasi seluruh afiliator KBA.
              </p>
            </div>

            {/* Month & Year Filter Selector */}
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-semibold">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Banner for Diligent Affiliates Rewards */}
          <div className="bg-gradient-to-r from-emerald-900 to-blue-900 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-emerald-700 space-y-2">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-400 shrink-0" />
              <h2 className="text-sm sm:text-base font-bold">
                Program Apresiasi Afiliator Teraktif Bulan {selectedMonth} {selectedYear}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Kampus Bahasa Arab memberikan insentif apresiasi sebesar <strong>Rp 150.000 bagi 10 Afiliator Paling Rajin Bulan {selectedMonth} {selectedYear}</strong> (masing-masing Rp 15.000). 
              Penilaian dihitung secara adil berdasarkan konsistensi publikasi edukasi harian Anda.
            </p>
          </div>

          {/* Highlight User Banner */}
          {userEntry && (
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-lg sm:text-xl flex items-center justify-center shadow-sm shrink-0">
                  #{userEntry.rank}
                </div>
                <div>
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-amber-200 inline-block">
                    Posisi Anda Saat Ini
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                    {user.name} ({user.id})
                  </h2>
                  <p className="text-xs text-slate-600 font-medium">
                    {activeTab === 'Keaktifan'
                      ? `Total Skor Keaktifan: ${userEntry.score} Poin`
                      : `Penjualan Terverifikasi: ${userEntry.score} Transaksi (${userEntry.totalAmount})`}
                  </p>
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900 space-y-0.5 w-full sm:w-auto">
                <p className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Masuk Top 10 Penerima Apresiasi
                </p>
                <p className="text-emerald-800 text-[11px]">Estimasi Insentif: Rp 15.000 (Bulan {selectedMonth} {selectedYear})</p>
              </div>
            </div>
          )}

          {/* Main Leaderboard Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="flex flex-col sm:flex-row border-b border-slate-200 bg-slate-50">
              <button
                onClick={() => setActiveTab('Keaktifan')}
                className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 sm:border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'Keaktifan'
                    ? 'border-blue-700 text-blue-800 bg-white sm:bg-transparent'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Award className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Peringkat Keaktifan Afiliator</span>
              </button>
              <button
                onClick={() => setActiveTab('Penjualan')}
                className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'Penjualan'
                    ? 'border-blue-700 text-blue-800 bg-white sm:bg-transparent'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Peringkat Penjualan Terverifikasi</span>
              </button>
            </div>

            {/* Rules Explainer Banner */}
            <div className="p-3.5 bg-blue-50/60 border-b border-blue-100 text-xs text-blue-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Ketentuan Perhitungan Peringkat:</p>
                <p className="text-blue-900 opacity-90 mt-0.5 leading-relaxed text-[11px] sm:text-xs">
                  {activeTab === 'Keaktifan'
                    ? 'Poin keaktifan dihitung berdasarkan konsistensi publikasi tugas promosi harian yang disetujui.'
                    : 'Penjualan dihitung berdasarkan komisi transaksi terverifikasi melalui link Lynk.id Anda.'}
                </p>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 sm:px-6 w-16">Peringkat</th>
                    <th className="py-3 px-4 sm:px-6">Nama Afiliator</th>
                    <th className="py-3 px-4 sm:px-6 text-right">
                      {activeTab === 'Keaktifan' ? 'Skor Keaktifan' : 'Jumlah Penjualan'}
                    </th>
                    {activeTab === 'Keaktifan' && <th className="py-3 px-4 sm:px-6 text-right">Bonus Rajin</th>}
                    {activeTab === 'Penjualan' && <th className="py-3 px-4 sm:px-6 text-right">Volume Penjualan</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {currentData.map((row) => (
                    <tr
                      key={row.rank}
                      className={`transition-colors ${
                        row.isCurrentUser ? 'bg-amber-500/15 font-bold text-slate-950' : 'hover:bg-slate-50/80 text-slate-800'
                      }`}
                    >
                      <td className="py-3.5 px-4 sm:px-6">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                            row.rank === 1
                              ? 'bg-amber-400 text-amber-950'
                              : row.rank === 2
                              ? 'bg-slate-200 text-slate-800'
                              : row.rank === 3
                              ? 'bg-amber-700/20 text-amber-900'
                              : row.rank <= 10 && activeTab === 'Keaktifan'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          #{row.rank}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 flex items-center gap-2">
                        <span>{row.displayName}</span>
                        {row.isCurrentUser && (
                          <span className="bg-amber-500 text-slate-950 text-[10px] px-2 py-0.5 rounded font-extrabold uppercase">
                            Anda
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right font-mono text-blue-900 font-bold">
                        {activeTab === 'Keaktifan' ? `${row.score} Poin` : `${row.score} Transaksi`}
                      </td>

                      {activeTab === 'Keaktifan' && (
                        <td className="py-3.5 px-4 sm:px-6 text-right">
                          {row.isDiligentWinner ? (
                            <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-2.5 py-1 rounded-full border border-emerald-300">
                              🎁 {row.rewardAmount}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs">-</span>
                          )}
                        </td>
                      )}

                      {activeTab === 'Penjualan' && (
                        <td className="py-3.5 px-4 sm:px-6 text-right font-mono text-emerald-700 font-bold">
                          {row.totalAmount || '-'}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Notice */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between gap-2 px-4 sm:px-6">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Privasi terjaga: Data publik hanya menampilkan nama tampilan, peringkat, dan skor keaktifan.
              </span>
            </div>
          </div>
        </div>
      </main>

      <MobileBottomNav user={user} />
    </div>
  );
}
