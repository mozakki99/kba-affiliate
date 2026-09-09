'use client';

import React from 'react';
import { Task } from '@/types';
import { Clock, Award, ArrowRight, CheckCircle2, XCircle, Check, Lock } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onOpenTask: (task: Task) => void;
  isProminent?: boolean;
}

export function TaskCard({ task, onOpenTask, isProminent }: TaskCardProps) {
  const isDone = task.status === 'Selesai';
  const isMissed = task.status === 'Terlewat';
  const isLocked = task.status === 'Terkunci';

  const getStatusBadge = (status: Task['status']) => {
    switch (status) {
      case 'Belum dikerjakan':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 text-xs px-2.5 py-1 rounded-full font-medium">
            Belum dikerjakan
          </span>
        );
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-700 text-white border border-emerald-800 text-xs px-2.5 py-1 rounded-full font-extrabold shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
            Selesai (Poin Diklaim)
          </span>
        );
      case 'Terlewat':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 border border-rose-200 text-xs px-2.5 py-1 rounded-full font-bold">
            <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            Terlewat
          </span>
        );
      case 'Terkunci':
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-300 text-xs px-2.5 py-1 rounded-full font-bold">
            <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            Belum Dibuka
          </span>
        );
    }
  };

  const telegramUrl = task.telegramMaterialUrl || 'https://t.me/materi_kba_official_private';

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 p-4 sm:p-6 flex flex-col justify-between ${
        isDone
          ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-500/10 shadow-xs'
          : isMissed
          ? 'bg-slate-50 border-slate-300 opacity-75'
          : isLocked
          ? 'bg-slate-50/50 border-slate-200 opacity-80'
          : isProminent
          ? 'bg-white border-blue-300 ring-2 ring-blue-500/10 shadow-sm'
          : 'bg-white border-slate-200/90'
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
              task.type === 'Kampanye'
                ? 'bg-amber-50 text-amber-900 border-amber-300/80 font-semibold'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {task.type === 'Kampanye' ? 'Kampanye Diskon' : 'Tugas Rutin'}
          </span>
          {getStatusBadge(task.status)}
        </div>

        {/* Action Title */}
        <h3 className={`font-bold text-sm sm:text-base leading-snug mb-1.5 break-words ${isDone ? 'text-emerald-950' : 'text-slate-900'}`}>
          {task.title}
        </h3>

        {/* Product Name */}
        <p className="text-xs sm:text-sm text-slate-600 font-medium mb-3 break-words">
          Produk: <span className="text-blue-900 font-semibold">{task.productName}</span>
        </p>

        {/* If done status, show submission note */}
        {isDone && (
          <div className="mb-4 p-3 bg-white/90 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1 break-words">
            <p className="font-bold flex items-start gap-1.5 text-emerald-800 leading-snug">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Absensi Terverifikasi: {task.submittedAt || 'Hari ini'}</span>
            </p>
            {task.submissionViewerCount && (
              <p className="text-emerald-800 font-medium pl-5 text-[11px]">Laporan Penonton: {task.submissionViewerCount}</p>
            )}
          </div>
        )}

        {isLocked && (
          <div className="mb-4 p-3 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center gap-2 font-medium break-words">
            <Lock className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Tugas ini akan terbuka pada {task.unlockDate || task.deadline}.</span>
          </div>
        )}
      </div>

      {/* Footer Info & Action Button */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center justify-between sm:justify-start gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1 shrink-0">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate max-w-[150px] sm:max-w-none">{task.deadline}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 shrink-0">
            <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>+{task.points} Poin</span>
          </div>
        </div>

        <button
          onClick={() => onOpenTask(task)}
          disabled={isMissed || isLocked}
          className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            isDone
              ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
              : isMissed
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300'
              : isLocked
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
          }`}
        >
          <span className="text-center">
            {isDone
              ? 'Lihat / Update Absensi'
              : isMissed
              ? 'Batas Waktu Terlewat'
              : isLocked
              ? `Terkunci (${task.unlockDate || 'Mendatang'})`
              : 'Kerjakan & Lapor Absensi'}
          </span>
          {!isMissed && !isLocked && <ArrowRight className="w-3.5 h-3.5 shrink-0" />}
        </button>
      </div>
    </div>
  );
}
