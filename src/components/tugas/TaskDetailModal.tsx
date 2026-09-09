'use client';

import React, { useState } from 'react';
import { Task, Campaign } from '@/types';
import { copyToClipboard, isValidUrl } from '@/lib/utils';
import {
  X,
  Copy,
  Check,
  Award,
  CheckCircle2,
  Send,
  ShieldCheck,
} from 'lucide-react';

interface TaskDetailModalProps {
  task: Task | null;
  campaign?: Campaign;
  userLynkId: string;
  onClose: () => void;
  onSubmitChecklist: (
    taskId: string,
    isCompletedChecked: boolean,
    platformsPosted?: string[],
    platformViewers?: Record<string, number>,
    submissionUrl?: string,
    submissionNote?: string
  ) => void;
  onShowToast: (text: string, type: 'success' | 'error' | 'info') => void;
}

const PLATFORM_OPTIONS = [
  'Feed IG',
  'Story IG',
  'Story WA',
  'Grup WA',
  'Thread',
  'Channel Telegram',
  'Lainnya',
] as const;

export function TaskDetailModal({
  task,
  campaign,
  userLynkId,
  onClose,
  onSubmitChecklist,
  onShowToast,
}: TaskDetailModalProps) {
  if (!task) return null;

  const lynkUrl = `https://lynk.id/${userLynkId || 'afiliator'}/${task.productId.replace('prod-', 'produk-')}`;

  const [isCompletedChecked, setIsCompletedChecked] = useState<boolean>(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    task.platformsPosted || ['Story WA']
  );
  const [customPlatform, setCustomPlatform] = useState<string>('');

  // Per-platform viewers map (e.g. { 'Story IG': '100', 'Thread': '50' })
  const [platformViewersMap, setPlatformViewersMap] = useState<Record<string, string>>(() => {
    const initialMap: Record<string, string> = {};
    if (task.platformViewers) {
      Object.entries(task.platformViewers).forEach(([k, v]) => {
        initialMap[k] = String(v);
      });
    } else if (task.viewerCountNumber) {
      initialMap['Story WA'] = String(task.viewerCountNumber);
    }
    return initialMap;
  });

  const [submissionUrl, setSubmissionUrl] = useState<string>(task.submissionUrl || '');
  const [submissionNote, setSubmissionNote] = useState<string>(task.submissionNote || '');

  const [copiedCaption, setCopiedCaption] = useState(false);
  const [isHonestyConfirmed, setIsHonestyConfirmed] = useState<boolean>(false);

  const togglePlatform = (p: string) => {
    if (selectedPlatforms.includes(p)) {
      setSelectedPlatforms(selectedPlatforms.filter((item) => item !== p));
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handleViewerChange = (platform: string, val: string) => {
    setPlatformViewersMap((prev) => ({
      ...prev,
      [platform]: val,
    }));
  };

  const handleCopyCaptionWithLink = async () => {
    let captionText = task.caption;
    if (!captionText.includes(lynkUrl)) {
      captionText += `\n\nAmankan promonya di sini: ${lynkUrl}`;
    }

    const ok = await copyToClipboard(captionText);
    if (ok) {
      setCopiedCaption(true);
      onShowToast('Caption + Link Lynk.id Anda berhasil disalin!', 'success');
      setTimeout(() => setCopiedCaption(false), 2500);
    } else {
      onShowToast('Gagal menyalin teks.', 'error');
    }
  };

  // Real-time Dual Point Calculation from per-platform viewers
  const totalViewerPoints = selectedPlatforms.reduce((sum, p) => {
    const val = platformViewersMap[p];
    if (val) {
      const num = parseInt(val, 10);
      return sum + (!isNaN(num) && num > 0 ? num : 0);
    }
    return sum;
  }, 0);

  const totalPointsToClaim = (task.points || 0) + totalViewerPoints;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCompletedChecked) {
      onShowToast('Harap centang konfirmasi bahwa Anda sudah posting', 'error');
      return;
    }
    if (!isHonestyConfirmed) {
      onShowToast('Harap centang pernyataan kejujuran terlebih dahulu', 'error');
      return;
    }
    if (selectedPlatforms.length === 0) {
      onShowToast('Pilih minimal 1 platform tempat Anda memposting', 'error');
      return;
    }
    if (submissionUrl && !isValidUrl(submissionUrl)) {
      onShowToast('Format URL postingan tidak valid', 'error');
      return;
    }

    let finalPlatforms = [...selectedPlatforms];
    if (customPlatform.trim()) {
      finalPlatforms = finalPlatforms.map((p) => (p === 'Lainnya' ? `Lainnya: ${customPlatform.trim()}` : p));
    }

    // Build final platformViewers object
    const finalPlatformViewers: Record<string, number> = {};
    selectedPlatforms.forEach((p) => {
      const val = platformViewersMap[p];
      if (val) {
        const num = parseInt(val, 10);
        if (!isNaN(num) && num > 0) {
          finalPlatformViewers[p] = num;
        }
      }
    });

    onSubmitChecklist(
      task.id,
      true,
      finalPlatforms,
      finalPlatformViewers,
      submissionUrl,
      submissionNote
    );
    onShowToast(`MasyaAllah! Poin diklaim: +${task.points} Poin Rajin +${totalViewerPoints} Poin Viewers!`, 'success');
    onClose();
  };

  const telegramUrl = task.telegramMaterialUrl || 'https://t.me/materi_kba_official_private';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-amber-500 text-slate-950 font-extrabold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> +{task.points} Poin Rajin
              </span>
              <span className="bg-blue-800 text-blue-100 text-xs px-2.5 py-0.5 rounded-full font-medium">
                {task.channel}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold leading-snug">{task.title}</h2>
            <p className="text-xs text-slate-300 mt-0.5">Produk: {task.productName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-slate-800 text-xs sm:text-sm">
          {/* Submission Status summary */}
          {task.status === 'Selesai' && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">Sistem Kejujuran: Tugas Selesai & Poin Kejujuran Langsung Masuk!</p>
                <p className="text-xs opacity-90">Dikirim pada: {task.submittedAt || '-'}</p>
                {task.platformsPosted && task.platformsPosted.length > 0 && (
                  <p className="text-xs font-semibold">
                    Platform posting: <span className="text-emerald-950 font-bold">{task.platformsPosted.join(', ')}</span>
                  </p>
                )}
                <div className="flex flex-wrap gap-2 text-xs pt-1">
                  <span className="bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-bold">
                    Poin Rajin: +{task.points}
                  </span>
                  {task.bonusViewerPoints && task.bonusViewerPoints > 0 ? (
                    <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300 font-bold">
                      Poin Viewers: +{task.bonusViewerPoints} (Total Viewers)
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          {/* 1. Salin Caption & Link Lynk.id */}
          <div className="space-y-2.5 bg-blue-50/80 border border-blue-200 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-blue-950 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center font-bold">1</span>
                Ambil Teks & Link Lynk.id
              </span>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-sky-700 font-bold hover:underline flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-sky-200"
              >
                <Send className="w-3.5 h-3.5 text-sky-600" />
                <span>Buka Telegram Gambar</span>
              </a>
            </div>

            <button
              onClick={handleCopyCaptionWithLink}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              {copiedCaption ? <Check className="w-4 h-4 text-amber-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCaption ? 'Tersalin Ke Clipboard!' : '1-Klik: Salin Caption + Link Lynk.id Saya'}</span>
            </button>

            <div className="p-3 bg-white border border-blue-200 rounded-lg text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed">
              {task.caption}
              <div className="mt-2 pt-2 border-t border-slate-100 text-blue-900 font-bold">
                Link Lynk.id Anda: <span className="underline">{lynkUrl}</span>
              </div>
            </div>
          </div>

          {/* 2. Form Absensi & Checklist Multi-Platform (Sistem Kejujuran) */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl">
            <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-xs flex items-center justify-center font-bold">2</span>
              Konfirmasi Absensi & Viewers Per-Platform
            </span>

            {/* Main Completion Checkbox */}
            <label className="flex items-start gap-3 p-3.5 bg-emerald-50/80 border border-emerald-300 rounded-xl cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isCompletedChecked}
                onChange={(e) => setIsCompletedChecked(e.target.checked)}
                className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 mt-0.5 shrink-0"
              />
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 text-xs sm:text-sm">Saya Sudah Mempublikasikan Materi Hari Ini</span>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Sistem KBA mengutamakan nilai-nilai amanah. Poin Rajin (+{task.points}) langsung terakumulasi ke profil Anda.
                </p>
              </div>
            </label>

            {/* Platform Checklist Selection with Inline Viewer Inputs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block font-bold text-slate-900 text-xs">
                  Platform Publikasi (Centang & Laporkan Jumlah Penonton):
                </label>
              </div>

              <div className="space-y-2">
                {PLATFORM_OPTIONS.map((platform) => {
                  const isChecked = selectedPlatforms.includes(platform);
                  return (
                    <div
                      key={platform}
                      className={`p-3 rounded-xl border transition-all ${
                        isChecked
                          ? 'bg-blue-50/90 border-blue-400 shadow-2xs space-y-2'
                          : 'bg-white border-slate-200 hover:bg-slate-100/80'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => togglePlatform(platform)}
                        className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-800 gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            readOnly
                            className="w-4 h-4 text-blue-600 rounded border-slate-300 shrink-0"
                          />
                          <span className={isChecked ? 'text-blue-950 font-extrabold truncate' : 'truncate'}>{platform}</span>
                        </div>
                        {isChecked && (
                          <span className="text-[10px] font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded shrink-0">
                            {platformViewersMap[platform] ? `${platformViewersMap[platform]} viewers (+${platformViewersMap[platform]} poin)` : 'Isi Penonton 👇'}
                          </span>
                        )}
                      </button>

                      {/* Inline Viewer Input opens directly under checked platform */}
                      {isChecked && (
                        <div className="pt-1">
                          <label className="block text-[11px] font-semibold text-blue-950 mb-1 break-words">
                            Jumlah penonton pada {platform}? (Format Wajib Angka)
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="1"
                            placeholder={`Contoh: 150 penonton ${platform}`}
                            value={platformViewersMap[platform] || ''}
                            onChange={(e) => handleViewerChange(platform, e.target.value)}
                            className="w-full p-2.5 bg-white text-xs font-bold border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 shadow-xs"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {selectedPlatforms.includes('Lainnya') && (
                <input
                  type="text"
                  placeholder="Sebutkan platform lainnya (misal: Twitter/X, TikTok)"
                  value={customPlatform}
                  onChange={(e) => setCustomPlatform(e.target.value)}
                  className="w-full mt-2 p-2.5 bg-white text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              )}
            </div>

            {/* Same-day 23:59 WIB deadline rule notice */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
              <p className="font-bold text-amber-900">
                ⏰ Aturan Pelaporan Penonton:
              </p>
              <p className="text-[11px] text-amber-950 leading-relaxed">
                Jumlah penonton dapat diisi atau diperbarui pada hari yang sama <strong>maksimal pukul 23:59 WIB</strong>. Setiap <strong>1 Viewer = +1 Poin Viewers</strong>!
              </p>
            </div>

            {/* Dual Point Summary Box */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span>Akumulasi Poin Tugas Ini:</span>
                <span className="text-emerald-800 text-sm font-extrabold">+{totalPointsToClaim} Total Poin</span>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-emerald-800 pt-0.5 font-medium">
                <span>• Poin Rajin: <strong>+{task.points} Poin</strong></span>
                <span>• Poin Viewers: <strong>+{totalViewerPoints} Poin</strong></span>
              </div>
            </div>

            {/* Checkbox Pernyataan Kejujuran (Sopan Tapi Tegas) */}
            <div
              className={`p-3.5 rounded-xl border transition-all ${
                isHonestyConfirmed
                  ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-xs'
                  : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            >
              <label className="flex items-start gap-2.5 cursor-pointer text-xs select-none">
                <input
                  type="checkbox"
                  checked={isHonestyConfirmed}
                  onChange={(e) => setIsHonestyConfirmed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 shrink-0 cursor-pointer"
                />
                <div className="space-y-1">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    Pernyataan Kejujuran Afiliator (Wajib Dicentang)
                  </span>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    "Dengan menyebut nama Allah, saya menyatakan dengan jujur dan sebenar-benarnya bahwa saya telah memposting materi promo ini serta mengisi data viewers dengan asli tanpa rekayasa demi menjaga keberkahan rezeki."
                  </p>
                </div>
              </label>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={!isHonestyConfirmed}
              className={`w-full py-3 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 ${
                isHonestyConfirmed
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan Absensi ({task.status === 'Selesai' ? 'Update' : 'Klaim'} +{totalPointsToClaim} Poin)</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
