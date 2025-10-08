'use client';

import { Sidebar } from './sidebar';
import { TopNav } from './top-nav';
import { Toaster } from 'sonner';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
