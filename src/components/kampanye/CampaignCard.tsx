'use client';

import React from 'react';
import { Campaign, Task } from '@/types';
import { Megaphone, Calendar, Award, CheckCircle2, AlertCircle } from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
  tasks: Task[];
  onOpenTask?: (task: Task) => void;
}

export function CampaignCard({ campaign, tasks, onOpenTask }: CampaignCardProps) {
  const campaignTasks = tasks.filter((t) => t.campaignId === campaign.id);
  const completedCount = campaignTasks.filter((t) => t.status === 'Selesai').length;
  const totalTasks = campaign.tasksSequence.length || campaignTasks.length || 1;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  const isExpired = campaign.status === 'Selesai';

  return (
    <div
      className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all space-y-5 ${
        isExpired ? 'border-slate-200 opacity-80' : 'border-blue-300 shadow-sm ring-1 ring-blue-500/10'
      }`}
    >
      {/* Top Banner & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-900 shrink-0 mt-0.5 sm:mt-0">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider inline-block ${
                campaign.status === 'Aktif'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : campaign.status === 'Mendatang'
                  ? 'bg-blue-100 text-blue-900 border border-blue-300'
                  : 'bg-slate-100 text-slate-600 border border-slate-300'
              }`}
            >
              Kampanye {campaign.status}
            </span>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg mt-1 break-words leading-snug">{campaign.title}</h3>
          </div>
        </div>

        <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0 self-start sm:self-auto">
          <Calendar className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            {campaign.startDate} s.d. {campaign.endDate} (WIB)
          </span>
        </div>
      </div>

      {/* Main Campaign Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
        <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <p className="text-slate-500 font-medium">Produk Kampanye:</p>
          <p className="font-bold text-slate-900">{campaign.productName}</p>
          <p className="text-slate-500 font-medium pt-1">Penawaran Spesial:</p>
          <p className="font-bold text-blue-900 bg-blue-100/70 p-2 rounded-lg text-xs">{campaign.offer}</p>
        </div>

        <div className="space-y-2 bg-amber-50/70 p-4 rounded-xl border border-amber-200/80">
          <p className="text-amber-950 font-bold flex items-center gap-1">
            <Award className="w-4 h-4 text-amber-600" /> Aturan Promo & Bonus:
          </p>
          <p className="text-amber-900 leading-relaxed text-xs">{campaign.rules}</p>
          <p className="text-amber-950 font-bold text-xs pt-1">Bonus Insentif: {campaign.bonus}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-semibold text-slate-700">
          <span>Progres Tugas Kampanye Anda</span>
          <span className="text-blue-800">{completedCount} dari {totalTasks} Tugas Selesai ({progressPercent}%)</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
          <div
            className="bg-blue-700 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Daily Tasks Breakdown */}
      <div className="space-y-3 pt-2">
        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
          Rangkaian Tugas Harian Kampanye:
        </h4>
        <div className="space-y-2">
          {campaign.tasksSequence.map((taskSeq) => {
            const matchedTask = campaignTasks.find((t) => t.title.includes(taskSeq.title) || t.points === taskSeq.points);
            const isDone = matchedTask?.status === 'Selesai';

            return (
              <div
                key={taskSeq.day}
                className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs sm:text-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    H{taskSeq.day}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{taskSeq.title}</p>
                    <p className="text-slate-500 text-xs">{taskSeq.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-amber-700 text-xs font-bold">+{taskSeq.points} Poin</span>
                  {matchedTask && onOpenTask && !isExpired && (
                    <button
                      onClick={() => onOpenTask(matchedTask)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-700 text-white hover:bg-blue-800'
                      }`}
                    >
                      {isDone ? 'Selesai' : 'Kerjakan'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expired warning */}
      {isExpired && (
        <div className="p-3 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-600 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
          <span>Periode kampanye ini telah berakhir.</span>
        </div>
      )}
    </div>
  );
}
