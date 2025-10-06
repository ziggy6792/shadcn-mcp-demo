'use client';
import * as React from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Select } from '@/components/ui/select';

export function Navbar() {
  return (
    <header className='sticky top-0 z-20 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='mx-auto flex h-14 w-full max-w-screen-2xl items-center gap-3 px-4'>
        <Link href='/' className='font-semibold'>
          IssueMind
        </Link>
        <div className='ml-2 hidden items-center gap-2 sm:flex'>
          <Select>
            <option>Repo A</option>
            <option>Repo B</option>
          </Select>
          <Input placeholder='Search issues…' className='w-56' />
        </div>
        <div className='ml-auto flex items-center gap-2'>
          <Button size='sm' variant='outline'>
            AI Assistant
          </Button>
          <Avatar />
        </div>
      </div>
    </header>
  );
}
