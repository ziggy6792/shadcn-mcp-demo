'use client';
import Link from 'next/link';
import { LayoutDashboardIcon, ListChecksIcon, SettingsIcon, WorkflowIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
  { href: '/repo/issue-mind/issues', label: 'Issues', icon: ListChecksIcon },
  { href: '/ai-tasks', label: 'AI Tasks', icon: WorkflowIcon },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className='w-56 border-r p-3 hidden md:block'>
      <nav className='grid gap-1'>
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn('flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent', active && 'bg-accent')}>
              <Icon className='size-4' />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
