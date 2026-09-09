'use client';

import React, { useState } from 'react';
import { useKBAStore } from '@/data/store';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { CampaignCard } from '@/components/kampanye/CampaignCard';
import { TaskDetailModal } from '@/components/tugas/TaskDetailModal';
import { ToastContainer, ToastMessage } from '@/components/ui/Toast';
import { Task } from '@/types';
import { Megaphone } from 'lucide-react';

export default function KampanyePage() {
  const {
    user,
    campaigns,
    tasks,
    isLoaded,
    submitTaskChecklist,
    resetDemoState,
  } = useKBAStore();

  const [activeTab, setActiveTab] = useState<'Aktif' | 'Mendatang' | 'Selesai'>('Aktif');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
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
        Memuat data kampanye...
      </div>
    );
  }

  const filteredCampaigns = campaigns.filter((c) => c.status === activeTab);

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col md:flex-row font-sans pb-20 md:pb-0">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
      <DesktopSidebar user={user} />

      <main className="flex-1 flex flex-col min-w-0">

        <div className="p-4 sm:p-8 max-w-5xl w-full mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Megaphone className="w-6 h-6 text-blue-700" />
                  Kampanye Afiliasi
                </h1>
                <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-black uppercase tracking-wider animate-pulse flex items-center gap-1">
                  📌 Fitur Mendatang (Segera Hadir)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Fitur ini sedang dalam tahap pengembangan konsep. Nanti di sini Admin dapat merilis event promo terbatas (seperti <em>Flash Sale Pekan Umrah</em>) dengan tantangan berseri, poin ganda, dan bonus apresiasi khusus.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold">
              {(['Aktif', 'Mendatang', 'Selesai'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveTab(status)}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                    activeTab === status
                      ? 'bg-blue-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  Kampanye {status}
                </button>
              ))}
            </div>
          </div>

          {/* List of Campaigns */}
          {filteredCampaigns.length === 0 ? (
            <div className="p-12 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Megaphone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-700 text-base">Tidak ada kampanye pada kategori ini</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Kampanye baru akan diumumkan secara berkala oleh admin KBA.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  tasks={tasks}
                  onOpenTask={(t) => setSelectedTask(t)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <MobileBottomNav user={user} />

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          campaign={campaigns.find((c) => c.id === selectedTask.campaignId)}
          userLynkId={user.lynkIdUsername}
          onClose={() => setSelectedTask(null)}
          onSubmitChecklist={(id, checked, platforms, platformViewers, url, note) => {
            submitTaskChecklist(id, checked, platforms, platformViewers, url, note);
          }}
          onShowToast={addToast}
        />
      )}
    </div>
  );
}
