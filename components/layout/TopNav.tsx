'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CommandIcon, GithubIcon, MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useTheme } from 'next-themes';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

export function TopNav() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <header className='flex h-14 items-center gap-3 border-b px-4'>
      <Link href='/' className='font-semibold'>
        IssueMind
      </Link>
      <Separator orientation='vertical' className='h-6' />
      <Button variant='outline' size='sm' onClick={() => setOpen(true)} className='gap-2'>
        <CommandIcon className='size-4' />
        <span className='hidden sm:inline'>Command</span>
        <kbd className='pointer-events-none hidden rounded border bg-muted px-1.5 py-0.5 text-[10px] sm:inline'>⌘K</kbd>
      </Button>
      <div className='ml-auto flex items-center gap-2'>
        <Button variant='ghost' size='icon' asChild>
          <Link href='https://github.com' target='_blank' aria-label='GitHub'>
            <GithubIcon className='size-5' />
          </Link>
        </Button>
        <Button variant='ghost' size='icon' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label='Toggle theme'>
          <SunIcon className='size-5 rotate-0 scale-100 dark:-rotate-90 dark:scale-0' />
          <MoonIcon className='absolute size-5 rotate-90 scale-0 dark:rotate-0 dark:scale-100' />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <Avatar className='size-8'>
                <AvatarImage src='/placeholder-user.jpg' alt='user' />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem asChild>
              <Link href='/settings'>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/login'>Log out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Search commands...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Navigation'>
            <CommandItem onSelect={() => (window.location.href = '/dashboard')}>Dashboard</CommandItem>
            <CommandItem onSelect={() => (window.location.href = '/ai-tasks')}>AI Tasks</CommandItem>
            <CommandItem onSelect={() => (window.location.href = '/settings')}>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
