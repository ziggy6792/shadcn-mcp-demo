'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { store } from '@/lib/store';

export default function RepoPage() {
  const router = useRouter();

  useEffect(() => {
    const currentRepo = store.getCurrentRepo();
    if (currentRepo) {
      router.push(`/repo/${currentRepo}/issues`);
    } else {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">Loading...</div>
    </div>
  );
}
