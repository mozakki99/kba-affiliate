'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TugasRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-medium">
      Mengalihkan ke Beranda...
    </div>
  );
}
