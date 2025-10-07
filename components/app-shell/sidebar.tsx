import Link from 'next/link';
import { cn } from '@/lib/utils';

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn('hidden md:block w-60 border-r bg-sidebar', className)}>
      <nav className='flex flex-col gap-1 p-3 text-sm'>
        <Link href='/dashboard' className='rounded-md px-3 py-2 hover:bg-sidebar-accent'>
          Dashboard
        </Link>
        <Link href='/ai-tasks' className='rounded-md px-3 py-2 hover:bg-sidebar-accent'>
          AI Tasks
        </Link>
        <Link href='/settings' className='rounded-md px-3 py-2 hover:bg-sidebar-accent'>
          Settings
        </Link>
      </nav>
    </aside>
  );
}
