"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { IconRobot, IconSearch } from "@tabler/icons-react"

export function TopNav() {
  const [selectedRepo, setSelectedRepo] = useState("owner/repo")

  return (
    <div className="flex h-16 items-center gap-4 border-b px-6">
      {/* Repository Selector */}
      <Select value={selectedRepo} onValueChange={setSelectedRepo}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select repository" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="owner/repo">owner/repo</SelectItem>
          <SelectItem value="owner/another-repo">owner/another-repo</SelectItem>
          <SelectItem value="user/frontend-app">user/frontend-app</SelectItem>
        </SelectContent>
      </Select>

      {/* Global Search */}
      <div className="relative flex-1 max-w-md">
        <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search issues..."
          className="w-full pl-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* AI Assistant Button */}
        <Button variant="outline" size="sm">
          <IconRobot className="mr-2 h-4 w-4" />
          AI Assistant
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
