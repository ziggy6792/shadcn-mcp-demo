'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  FileTextIcon,
  BotIcon,
  SettingsIcon,
  GithubIcon,
  SearchIcon,
} from 'lucide-react';
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const links = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    label: 'Repositories',
    href: '/repositories',
    icon: <GithubIcon className="h-5 w-5" />,
  },
  {
    label: 'AI Tasks',
    href: '/ai-tasks',
    icon: <BotIcon className="h-5 w-5" />,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <SettingsIcon className="h-5 w-5" />,
  },
];

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={cn('flex h-screen w-full overflow-hidden')}>
      <Sidebar>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-8 flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="font-bold text-2xl mb-6 flex items-center gap-2"
              >
                <BotIcon className="h-6 w-6" />
                <span>IssueMind</span>
              </Link>
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className={cn(
                    pathname === link.href && 'bg-accent text-accent-foreground'
                  )}
                />
              ))}
            </div>
          </div>
          <div className="border-t border-border pt-4">
            <SidebarLink
              link={{
                label: 'User Account',
                href: '/settings',
                icon: (
                  <div className="h-7 w-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                    U
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 overflow-auto">
        <div className="h-full w-full">{children}</div>
      </main>
    </div>
  );
}
