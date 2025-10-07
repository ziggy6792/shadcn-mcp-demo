'use client'

import { Search, Command } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RepositorySelector } from './repository-selector'
import { ThemeToggle } from './theme-toggle'
import { UserMenu } from './user-menu'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4">
        <SidebarTrigger />

        <RepositorySelector />

        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              className="pl-8 pr-12"
              onClick={() => {
                // Command palette will be triggered
                const event = new KeyboardEvent('keydown', {
                  key: 'k',
                  metaKey: true,
                })
                window.dispatchEvent(event)
              }}
            />
            <kbd className="pointer-events-none absolute right-2 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <Command className="h-3 w-3" />K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
