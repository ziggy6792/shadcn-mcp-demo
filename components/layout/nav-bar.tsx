'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, Command, Github, User, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { mockUser } from '@/lib/mock-data';

export function NavBar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center px-4'>
        <div className='mr-4 flex'>
          <Link href='/dashboard' className='mr-6 flex items-center space-x-2'>
            <Github className='h-6 w-6' />
            <span className='font-bold'>IssueMind (shadcn-raw)</span>
          </Link>
        </div>

        <div className='flex flex-1 items-center space-x-4'>
          <div className='relative flex-1 max-w-md'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input placeholder='Search issues, repos... (⌘K)' className='pl-8' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        <div className='flex items-center space-x-2'>
          <Button variant='ghost' size='icon' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Sun className='h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <Moon className='absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            <span className='sr-only'>Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback>
                    {mockUser.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm font-medium leading-none'>{mockUser.name}</p>
                  <p className='text-xs leading-none text-muted-foreground'>{mockUser.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href='/settings'>
                  <Settings className='mr-2 h-4 w-4' />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href='/login'>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
