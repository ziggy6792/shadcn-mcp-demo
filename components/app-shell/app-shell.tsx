import * as React from 'react';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import { CommandPalette } from '@/components/command-palette';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[240px_1fr]'>
        <Sidebar />
        <main className='p-4 md:p-6'>{children}</main>
      </div>
      <CommandPalette />
    </div>
  );
}
