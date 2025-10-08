'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Issues',
    href: '/repo/issuemind-core/issues',
    icon: FileText
  },
  {
    title: 'AI Tasks',
    href: '/ai-tasks',
    icon: Bot
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings
  }
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'flex flex-col h-screen border-r bg-background transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">IssueMind</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(collapsed && 'mx-auto')}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  collapsed && 'justify-center px-2'
                )}
              >
                <Icon className={cn('h-5 w-5', !collapsed && 'mr-2')} />
                {!collapsed && <span>{item.title}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* Footer */}
      <div className="p-4">
        {!collapsed && (
          <p className="text-xs text-muted-foreground">
            AI-Powered Issue Tracking
          </p>
        )}
      </div>
    </div>
  );
}
