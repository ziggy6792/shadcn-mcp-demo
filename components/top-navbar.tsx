"use client"

import * as React from "react"
import { SearchIcon, SparklesIcon, UserIcon, LogOutIcon, SettingsIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface TopNavbarProps {
  repositories?: Array<{ id: string; name: string; owner: string }>
  currentRepo?: string
  onRepoChange?: (repoId: string) => void
  onSearch?: (query: string) => void
  onAIAssistant?: () => void
  user?: {
    name: string
    email: string
    avatar?: string
  }
}

export function TopNavbar({
  repositories = [],
  currentRepo,
  onRepoChange,
  onSearch,
  onAIAssistant,
  user = { name: "Developer", email: "dev@example.com" },
}: TopNavbarProps) {
  const [searchQuery, setSearchQuery] = React.useState("")

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b px-4">
      <SidebarTrigger className="-ml-1" />

      {/* Repository Selector */}
      <Select value={currentRepo} onValueChange={onRepoChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select repository" />
        </SelectTrigger>
        <SelectContent>
          {repositories.map((repo) => (
            <SelectItem key={repo.id} value={repo.id}>
              {repo.owner}/{repo.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md">
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search issues..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      {/* AI Assistant Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onAIAssistant}
        className="gap-2"
      >
        <SparklesIcon className="h-4 w-4" />
        AI Assistant
      </Button>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
