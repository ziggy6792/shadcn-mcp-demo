import * as React from 'react';
import { Navbar } from '@/components/app/Navbar';
import { Sidebar } from '@/components/app/Sidebar';

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-dvh'>
      <Navbar />
      <div className='mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-0 px-4 md:grid-cols-[16rem_1fr]'>
        <Sidebar />
        <main className='min-h-[calc(100dvh-56px)] py-4'>{children}</main>
      </div>
    </div>
  );
}
