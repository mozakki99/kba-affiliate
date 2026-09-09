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
  const years = Array.from({ length: 2099 - 2024 + 1 }, (_, i) => String(2024 + i));
  const TOTAL_MONTHLY_BUDGET = 150000;
  const MAX_CAP_PER_USER = 45000;

  const top10Activity = leaderboardActivity.slice(0, 10);
  const totalTop10Points = top10Activity.reduce((sum, item) => sum + item.score, 0);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const calculateCappedRewardsMap = () => {
    if (totalTop10Points === 0) return {};
    const sharesMap: Record<number, number> = {};

    let remainingBudget = TOTAL_MONTHLY_BUDGET;
    let remainingIndices = top10Activity.map((_, i) => i);
    const finalRewards: number[] = new Array(top10Activity.length).fill(0);

    while (remainingIndices.length > 0) {
      const currentRemainingPoints = remainingIndices.reduce((sum, idx) => sum + top10Activity[idx].score, 0);
      if (currentRemainingPoints === 0) break;

      let newlyCapped = false;
      for (const idx of remainingIndices) {
        const share = (top10Activity[idx].score / currentRemainingPoints) * remainingBudget;
        if (share > MAX_CAP_PER_USER) {
          finalRewards[idx] = MAX_CAP_PER_USER;
          remainingBudget -= MAX_CAP_PER_USER;
          remainingIndices = remainingIndices.filter((i) => i !== idx);
          newlyCapped = true;
          break;
        }
      }

      if (!newlyCapped) {
        for (const idx of remainingIndices) {
          const share = (top10Activity[idx].score / currentRemainingPoints) * remainingBudget;
          finalRewards[idx] = Math.round(share);
        }
        break;
      }
    }

    top10Activity.forEach((item, idx) => {
      sharesMap[item.rank] = finalRewards[idx];
    });

    return sharesMap;
  };

  const rewardsMap = calculateCappedRewardsMap();

  const getProportionalReward = (rank: number, score: number) => {
    if (rank <= 10 && rewardsMap[rank] !== undefined) {
      return formatRupiah(rewardsMap[rank]);
    }
    return 'Rp 0';
  };

  const [showPointsRulesInfo, setShowPointsRulesInfo] = useState<boolean>(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-medium">
        Memuat peringkat...
      </div>
    );
  }

  const currentData = activeTab === 'Keaktifan' ? leaderboardActivity : leaderboardSales;
  const userEntry = currentData.find((d) => d.isCurrentUser);
  const userEstimatedReward = userEntry && activeTab === 'Keaktifan' ? getProportionalReward(userEntry.rank, userEntry.score) : 'Rp 0';

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
          <div className="bg-gradient-to-r from-emerald-900 to-blue-900 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-emerald-700 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-400 shrink-0" />
                <h2 className="text-sm sm:text-base font-bold">
                  Program Apresiasi Afiliator Teraktif Bulan {selectedMonth} {selectedYear}
                </h2>
              </div>
              <button
                onClick={() => setShowPointsRulesInfo(!showPointsRulesInfo)}
                className="bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/20 transition-colors flex items-center gap-1.5"
              >
                <Info className="w-3.5 h-3.5 text-amber-300" />
                <span>Info Perpoinan & Aturan</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Kampus Bahasa Arab membagikan total insentif sebesar <strong>Rp 150.000 secara adil & proporsional untuk 10 Afiliator Teraktif Bulan {selectedMonth} {selectedYear}</strong>. 
              Nominal insentif setiap peserta dihitung otomatis berdasarkan rasio poin Anda terhadap total poin top 10 (dengan batas maksimal Rp 45.000/orang agar insentif terdistribusi merata).
            </p>

            {/* Expandable Points Info Box */}
            {showPointsRulesInfo && (
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-emerald-500/40 text-xs space-y-2 mt-3 animate-in fade-in duration-200">
                <h3 className="font-bold text-amber-300 flex items-center gap-1.5 text-xs sm:text-sm">
                  📌 Panduan Lengkap Sistem Perpoinan & Apresiasi KBA:
                </h3>
                <ul className="space-y-1.5 text-emerald-100 leading-relaxed list-disc list-inside">
                  <li>
                    <strong>Poin Rajin Posting (+10 Poin / Tugas)</strong>: Diperoleh otomatis setiap kali Anda menyelesaikan tugas promosi yang dirilis KBA.
                  </li>
                  <li>
                    <strong>Poin Bonus Viewers (10 Viewers = 1 Poin)</strong>: Penonton postingan Anda dikonversi dengan rasio 10 viewers = 1 poin (maksimal <strong>+200 Poin per tugas</strong>).
                  </li>
                  <li>
                    <strong>Perhitungan Insentif Proporsional</strong>: Total anggaran Rp 150.000 dibagikan secara adil berdasarkan porsi persentase poin Anda terhadap Top 10.
                  </li>
                  <li>
                    <strong>Batas Maksimum (Cap Rp 45.000 / Orang)</strong>: Untuk mencegah monopoli jika ada postingan yang sangat viral, insentif per orang dibatasi maksimal Rp 45.000, dan sisa dananya otomatis dibagikan ke afiliator rajin lainnya di Top 10.
                  </li>
                </ul>
              </div>
            )}
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
                      ? `Total Skor Keaktifan: ${userEntry.score} Poin (${((userEntry.score / totalTop10Points) * 100).toFixed(1)}% dari Total Top 10)`
                      : `Penjualan Terverifikasi: ${userEntry.score} Transaksi (${userEntry.totalAmount})`}
                  </p>
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900 space-y-0.5 w-full sm:w-auto">
                <p className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Masuk Top 10 Penerima Apresiasi
                </p>
                <p className="text-emerald-800 text-[11px]">
                  Estimasi Insentif Proporsional: <strong>{userEstimatedReward}</strong>
                </p>
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
                <p className="font-bold">Ketentuan Perhitungan Peringkat & Apresiasi:</p>
                <p className="text-blue-900 opacity-90 mt-0.5 leading-relaxed text-[11px] sm:text-xs">
                  {activeTab === 'Keaktifan'
                    ? 'Poin dihitung dari absensi postingan & jumlah viewers. Total insentif Rp 150.000 dibagikan otomatis & adil proporsional: (Poin Anda ÷ Total Poin Top 10) × Rp 150.000.'
                    : 'Penjualan dihitung berdasarkan komisi transaksi terverifikasi melalui link Lynk.id Anda.'}
                </p>
              </div>
            </div>

            {/* Mobile Leaderboard List (Mobile-Optimized Layout) */}
            <div className="sm:hidden divide-y divide-slate-100">
              {currentData.map((row) => (
                <div
                  key={row.rank}
                  className={`p-3.5 flex items-center justify-between gap-2.5 transition-colors ${
                    row.isCurrentUser ? 'bg-amber-500/15 font-bold text-slate-950' : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
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
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="font-bold text-xs truncate">{row.displayName}</span>
                        {row.isCurrentUser && (
                          <span className="bg-amber-500 text-slate-950 text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase shrink-0">
                            Anda
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-blue-900 font-semibold font-mono block">
                        {activeTab === 'Keaktifan' ? `${row.score} Poin` : `${row.score} Transaksi`}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    {activeTab === 'Keaktifan' ? (
                      row.rank <= 10 ? (
                        <span className="bg-emerald-100 text-emerald-900 font-bold text-[11px] px-2 py-1 rounded-full border border-emerald-300 inline-block shadow-2xs">
                          🎁 {getProportionalReward(row.rank, row.score)}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">-</span>
                      )
                    ) : (
                      <span className="font-mono text-emerald-700 font-bold text-xs">
                        {row.totalAmount || '-'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Leaderboard Table (Tablet & Desktop Layout) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm min-w-[640px]">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 sm:px-6 w-16">Peringkat</th>
                    <th className="py-3 px-4 sm:px-6">Nama Afiliator</th>
                    <th className="py-3 px-4 sm:px-6 text-right">
                      {activeTab === 'Keaktifan' ? 'Skor Keaktifan' : 'Jumlah Penjualan'}
                    </th>
                    {activeTab === 'Keaktifan' && <th className="py-3 px-4 sm:px-6 text-right">Bonus Insentif (Proporsional)</th>}
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
                          {row.rank <= 10 ? (
                            <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-2.5 py-1 rounded-full border border-emerald-300">
                              🎁 {getProportionalReward(row.rank, row.score)}
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
