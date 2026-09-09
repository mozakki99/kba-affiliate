'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useKBAStore } from '@/data/store';
import { getCurrentDateFormatted, copyToClipboard } from '@/lib/utils';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { DemoBadge } from '@/components/layout/DemoBadge';
import { TaskCard } from '@/components/tugas/TaskCard';
import { TaskDetailModal } from '@/components/tugas/TaskDetailModal';
import { ToastContainer, ToastMessage } from '@/components/ui/Toast';
import { Task } from '@/types';
import {
  Megaphone,
  CheckSquare,
  TrendingUp,
  Trophy,
  ArrowRight,
  Calendar,
  Flame,
  Gift,
  CheckCircle2,
  Send,
  History,
  Clock,
  Copy,
  Check,
  XCircle,
  ShieldCheck,
  Award,
  Lock,
  Filter,
  CalendarDays,
} from 'lucide-react';

export default function HomePage() {
  const {
    user,
    tasks,
    campaigns,
    isLoaded,
    submitTaskChecklist,
    resetDemoState,
  } = useKBAStore();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [copiedToday, setCopiedToday] = useState(false);

  // Quick form for today's primary task
  const [viewerCount, setViewerCount] = useState('');
  const [isDoneChecked, setIsDoneChecked] = useState(true);

  // Task filtering & date management states
  const [taskTab, setTaskTab] = useState<'Semua' | 'Hari Ini' | 'Selesai' | 'Kadaluarsa' | 'Mendatang'>('Semua');
  const [selectedMonth, setSelectedMonth] = useState<string>('September 2026');
  const [displayLimit, setDisplayLimit] = useState<number>(5);

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
        Memuat KBA Affiliate...
      </div>
    );
  }

  const activeCampaign = campaigns.find((c) => c.status === 'Aktif');

  // Primary active task today
  const activeTodayTask = tasks.find((t) => t.deadline.includes('Hari ini') && t.status === 'Belum dikerjakan') || tasks[0];

  // Detailed Mission Statistics
  const completedMissionsCount = tasks.filter((t) => t.status === 'Selesai').length + 10; // e.g. 12 completed lifetime
  const missedMissionsCount = tasks.filter((t) => t.status === 'Terlewat').length + 3; // e.g. 5 missed lifetime

  // Filtered task catalog
  const filteredTasks = tasks.filter((t) => {
    // Month filter
    if (selectedMonth !== 'Semua Bulan' && t.taskMonth && t.taskMonth !== selectedMonth) {
      return false;
    }
    // Tab filter
    if (taskTab === 'Hari Ini') return t.deadline.includes('Hari ini');
    if (taskTab === 'Selesai') return t.status === 'Selesai';
    if (taskTab === 'Kadaluarsa') return t.status === 'Terlewat';
    if (taskTab === 'Mendatang') return t.status === 'Terkunci';
    return true;
  });

  const visibleTasks = filteredTasks.slice(0, displayLimit);

  const lynkUrl = activeTodayTask
    ? `https://lynk.id/${user.lynkIdUsername || 'ahmad'}/${activeTodayTask.productId.replace('prod-', 'produk-')}`
    : `https://lynk.id/${user.lynkIdUsername || 'ahmad'}`;

  const telegramUrl = activeTodayTask?.telegramMaterialUrl || 'https://t.me/materi_kba_official_private';

  const handleCopyCaptionToday = async () => {
    if (!activeTodayTask) return;
    let text = activeTodayTask.caption;
    if (!text.includes(lynkUrl)) {
      text += `\n\nAmankan promonya di sini: ${lynkUrl}`;
    }
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedToday(true);
      addToast('Caption + Link Lynk.id Anda disalin!', 'success');
      setTimeout(() => setCopiedToday(false), 2500);
    }
  };

  // Quick form state cleaned up in favor of multi-task modal checklist

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col md:flex-row font-sans pb-20 md:pb-0">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
      <DesktopSidebar user={user} />

      <main className="flex-1 flex flex-col min-w-0">
        <DemoBadge onResetDemo={resetDemoState} />

        <div className="p-4 sm:p-6 max-w-5xl w-full mx-auto space-y-5">
          {/* HEADER STATISTIK BERANDA DETAIL (HARI, POIN, MISI SELESAI, MISI TERLEWAT, PERINGKAT) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            {/* Row 1: Day & Date Greeting */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  Hari ini: {getCurrentDateFormatted()} (WIB)
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1.5">
                  Assalamu'alaikum, {user.name}!
                </h1>
                <p className="text-xs text-slate-500">
                  ID Afiliator: <strong className="text-amber-800">{user.id}</strong> • Lynk.id: <strong className="text-blue-800">lynk.id/{user.lynkIdUsername}</strong>
                </p>
              </div>

              {/* Streak Badge (R-31 Design Choice: Amber accent for active user motivation without endless animation loop) */}
              <div className="flex items-center gap-2 bg-amber-500 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-xs">
                <Flame className="w-4 h-4 text-slate-950" />
                <span>Streak Promosi: {user.streakDays} Hari</span>
              </div>
            </div>

            {/* Row 2: Detailed Mission & Dual Point Metrics Grid (5 Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
              {/* Metric 1: Total Misi Selesai (Lifetime) */}
              <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 space-y-1">
                <div className="flex items-center gap-1 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">Misi Selesai</span>
                </div>
                <p className="text-base sm:text-lg font-extrabold text-emerald-950">{completedMissionsCount} Misi</p>
                <span className="text-[10px] text-emerald-700 font-medium">Lifetime Selesai</span>
              </div>

              {/* Metric 2: Total Misi Terlewat (Lifetime) */}
              <div className="bg-rose-50/80 p-3 rounded-xl border border-rose-200 space-y-1">
                <div className="flex items-center gap-1 text-rose-800 font-bold">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="truncate">Misi Terlewat</span>
                </div>
                <p className="text-base sm:text-lg font-extrabold text-rose-950">{missedMissionsCount} Misi</p>
                <span className="text-[10px] text-rose-700 font-medium">Lifetime Terlewat</span>
              </div>

              {/* Metric 3: Poin Rajin (Keaktifan) */}
              <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-200 space-y-1">
                <div className="flex items-center gap-1 text-blue-900 font-bold">
                  <Award className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">Poin Rajin</span>
                </div>
                <p className="text-base sm:text-lg font-extrabold text-blue-900">+{user.diligencePoints || 420} Poin</p>
                <span className="text-[10px] text-blue-700 font-medium">Bonus Posting Absensi</span>
              </div>

              {/* Metric 4: Poin Viewers (Jangkauan) */}
              <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="flex items-center gap-1 text-amber-900 font-bold">
                  <TrendingUp className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="truncate">Poin Viewers</span>
                </div>
                <p className="text-base sm:text-lg font-extrabold text-amber-900">+{user.viewerPoints || 350} Poin</p>
                <span className="text-[10px] text-amber-800 font-medium">1 Viewer = +1 Poin</span>
              </div>

              {/* Metric 5: Total Poin Kejujuran & Peringkat */}
              <div className="bg-emerald-100/90 p-3 rounded-xl border border-emerald-300 space-y-1 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1 text-emerald-950 font-bold">
                  <Trophy className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="truncate">Total Poin</span>
                </div>
                <p className="text-base sm:text-lg font-extrabold text-emerald-950">
                  {user.totalPoints || 770} Poin <span className="text-xs text-emerald-800 font-bold">(#3 Top 10)</span>
                </p>
                <span className="text-[10px] text-emerald-800 font-medium">Total Akumulasi</span>
              </div>
            </div>

            {/* Trust System Explainer Notice */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                SISTEM KEJUJURAN KBA: Begitu Anda centang "Saya Sudah Posting Hari Ini", poin keaktifan LANGSUNG MASUK!
              </span>
              <a
                href="https://t.me/materi_kba_official_private"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-sky-800 hover:underline flex items-center gap-1 shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-sky-600" />
                <span>Telegram Gambar</span>
              </a>
            </div>
          </div>

          {/* BANNER HADIAH AFILIATOR PALING RAJIN */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-blue-900 text-white p-4 sm:p-5 rounded-2xl shadow-sm border border-emerald-700 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-400 text-slate-950 rounded-lg">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <span className="bg-amber-400 text-slate-950 font-black text-[10px] uppercase px-2 py-0.5 rounded">
                  Program Afiliator Rajin
                </span>
                <h2 className="font-bold text-sm sm:text-base text-white mt-0.5">
                  Total Hadiah Rp 150.000 untuk 10 Afiliator Paling Rajin Pekan Ini!
                </h2>
                <p className="text-emerald-100 text-[11px]">
                  Tidak dipengaruhi closing, yang penting rajin salin teks & centang tugas harian! (Insentif Rp 15.000 / orang).
                </p>
              </div>
            </div>
            <Link
              href="/peringkat"
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl shrink-0 transition-colors"
            >
              Lihat Top 10
            </Link>
          </div>

          {/* SEKSI DAFTAR TUGAS HARI INI (MULTI-TASK HARIAN) */}
          <div className="bg-white p-5 rounded-2xl border-2 border-blue-600 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="bg-blue-100 text-blue-950 font-extrabold text-xs px-3 py-1 rounded-lg inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-700" />
                  DAFTAR TUGAS HARI INI ({tasks.filter((t) => t.deadline.includes('Hari ini')).length} MISI AKTIF)
                </span>
                <h2 className="font-bold text-slate-900 text-base sm:text-lg mt-1.5">
                  Misi Promosi Harian Afiliator (Berlaku s.d 23:59 WIB)
                </h2>
                <p className="text-xs text-slate-500">
                  Kerjakan & centang absensi untuk klaim +Poin Rajin & +Poin Viewers!
                </p>
              </div>

              <a
                href="https://t.me/materi_kba_official_private"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-sky-50 text-sky-800 border border-sky-200 rounded-xl text-xs font-bold hover:bg-sky-100 transition-colors flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5 text-sky-600" />
                <span>Channel Telegram Materi</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks
                .filter((t) => t.deadline.includes('Hari ini'))
                .map((t) => (
                  <TaskCard
                    key={t.id}
                    task={t}
                    isProminent={t.status === 'Belum dikerjakan'}
                    onOpenTask={(task) => setSelectedTask(task)}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          userLynkId={user.lynkIdUsername}
          onClose={() => setSelectedTask(null)}
          onSubmitChecklist={(taskId, isCompleted, platforms, platformViewers, url, note) => {
            submitTaskChecklist(taskId, isCompleted, platforms, platformViewers, url, note);
          }}
          onShowToast={addToast}
        />
      )}

      <MobileBottomNav user={user} />
    </div>
  );
}
