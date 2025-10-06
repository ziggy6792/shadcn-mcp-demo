'use client';
import * as React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export function Sidebar() {
  return (
    <aside className='sticky top-14 hidden h-[calc(100dvh-56px)] w-64 shrink-0 border-r bg-background/50 p-3 md:block'>
      <nav className='flex flex-col gap-1'>
        <Link href='/dashboard' className='rounded-md px-2 py-1.5 hover:bg-accent'>
          Dashboard
        </Link>
        <Link href='/repo/sample/issues' className='rounded-md px-2 py-1.5 hover:bg-accent'>
          Issues{' '}
          <Badge className='ml-2' variant='secondary'>
            12
          </Badge>
        </Link>
        <Link href='/ai-tasks' className='rounded-md px-2 py-1.5 hover:bg-accent'>
          AI Tasks
        </Link>
        <Link href='/settings' className='rounded-md px-2 py-1.5 hover:bg-accent'>
          Settings
        </Link>
      </nav>
    </aside>
  );
}
