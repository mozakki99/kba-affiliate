'use client';

import React from 'react';
import { Info, RotateCcw } from 'lucide-react';

interface DemoBadgeProps {
  onResetDemo?: () => void;
}

export function DemoBadge({ onResetDemo }: DemoBadgeProps) {
  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-900 text-xs sm:text-sm py-2 px-4 flex items-center justify-between gap-2 font-medium">
      <div className="flex items-center gap-2">
        <span className="bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
          Mode Demo
        </span>
        <span className="truncate">
          Data contoh Afiliator: <strong>Ahmad (KBA-014)</strong>. Data tersimpan lokal di browser Anda.
        </span>
      </div>
      {onResetDemo && (
        <button
          onClick={onResetDemo}
          className="flex items-center gap-1 text-amber-800 hover:text-amber-950 underline shrink-0 transition-colors"
          title="Reset data demo ke kondisi awal"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Demo</span>
        </button>
      )}
    </div>
  );
}
