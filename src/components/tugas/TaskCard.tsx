'use client';

import React from 'react';
import { Task } from '@/types';
import { Clock, Award, Camera, MessageCircle, Users, ArrowRight, CheckCircle2, XCircle, Check, Send, Lock } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onOpenTask: (task: Task) => void;
  isProminent?: boolean;
}

export function TaskCard({ task, onOpenTask, isProminent }: TaskCardProps) {
  const isDone = task.status === 'Selesai';
  const isMissed = task.status === 'Terlewat';
  const isLocked = task.status === 'Terkunci';

  const getChannelBadge = (channel: Task['channel']) => {
    switch (channel) {
      case 'Instagram Story':
        return (
          <span className="inline-flex items-center gap-1 bg-pink-50 text-pink-700 border border-pink-200/70 text-xs px-2.5 py-1 rounded-full font-medium">
            <Camera className="w-3.5 h-3.5" />
            Instagram Story
          </span>
        );
      case 'WhatsApp Status':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-xs px-2.5 py-1 rounded-full font-medium">
            <MessageCircle className="w-3.5 h-3.5" />
            WA Status
          </span>
        );
      case 'Grup WhatsApp':
        return (
          <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 border border-teal-200/70 text-xs px-2.5 py-1 rounded-full font-medium">
            <Users className="w-3.5 h-3.5" />
            Grup WA
          </span>
        );
    }
  };

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
          <span className="inline-flex items-center gap-1 bg-emerald-700 text-white border border-emerald-800 text-xs px-3 py-1 rounded-full font-extrabold shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
            SELESAI (POIN MASUK)
          </span>
        );
      case 'Terlewat':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 border border-rose-200 text-xs px-2.5 py-1 rounded-full font-bold">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            HANGUS / TERLEWAT
          </span>
        );
      case 'Terkunci':
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-300 text-xs px-2.5 py-1 rounded-full font-bold">
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            BELUM DIBUKA
          </span>
        );
    }
  };

  const telegramUrl = task.telegramMaterialUrl || 'https://t.me/materi_kba_official_private';

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 p-5 sm:p-6 flex flex-col justify-between ${
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
          <div className="flex items-center gap-2">
            {getChannelBadge(task.channel)}
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                task.type === 'Kampanye'
                  ? 'bg-amber-50 text-amber-900 border-amber-300/80 font-semibold'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {task.type === 'Kampanye' ? 'Kampanye' : 'Routine'}
            </span>
          </div>
          {getStatusBadge(task.status)}
        </div>

        {/* Action Title */}
        <h3 className={`font-bold text-base sm:text-lg leading-snug mb-1 ${isDone ? 'text-emerald-950' : 'text-slate-900'}`}>
          {task.title}
        </h3>

        {/* Product Name */}
        <p className="text-xs sm:text-sm text-slate-600 font-medium mb-3">
          Produk: <span className="text-blue-900 font-semibold">{task.productName}</span>
        </p>

        {/* If done status, show submission note */}
        {isDone && (
          <div className="mb-4 p-3 bg-white/90 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-emerald-800">
              <Check className="w-4 h-4 text-emerald-600" /> Dicentang pada: {task.submittedAt || 'Hari ini'} (Poin Kejujuran Berhasil Diklaim)
            </p>
            {task.submissionViewerCount && (
              <p className="text-emerald-800 font-medium">Laporan viewer: {task.submissionViewerCount}</p>
            )}
          </div>
        )}

        {isLocked && (
          <div className="mb-4 p-3 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center gap-2 font-medium">
            <Lock className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Tugas ini dibuka pada tanggal {task.unlockDate || task.deadline}.</span>
          </div>
        )}
      </div>

      {/* Footer Info & Action Button */}
      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{task.deadline}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>+{task.points} Poin</span>
          </div>
        </div>

        <button
          onClick={() => onOpenTask(task)}
          disabled={isMissed || isLocked}
          className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all ${
            isDone
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold'
              : isMissed
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300'
              : isLocked
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
          }`}
        >
          <span>
            {isDone
              ? 'Lihat / Update Absensi'
              : isMissed
              ? 'Misi Hangus'
              : isLocked
              ? `Terkunci (${task.unlockDate || 'Mendatang'})`
              : 'Kerjakan & Centang'}
          </span>
          {!isMissed && !isLocked && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
