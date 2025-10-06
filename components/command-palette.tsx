"use client"

import * as React from "react"
import {
  SearchIcon,
  FileTextIcon,
  SettingsIcon,
  SparklesIcon,
  InboxIcon,
} from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Search">
          <CommandItem>
            <SearchIcon className="mr-2 h-4 w-4" />
            <span>Search issues...</span>
          </CommandItem>
          <CommandItem>
            <FileTextIcon className="mr-2 h-4 w-4" />
            <span>Search repositories...</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigation">
          <CommandItem>
            <InboxIcon className="mr-2 h-4 w-4" />
            <span>Go to Issues</span>
            <CommandShortcut>⌘I</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>Go to Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="AI Actions">
          <CommandItem>
            <SparklesIcon className="mr-2 h-4 w-4" />
            <span>Generate AI Summary</span>
          </CommandItem>
          <CommandItem>
            <SparklesIcon className="mr-2 h-4 w-4" />
            <span>Auto-prioritize Issues</span>
          </CommandItem>
          <CommandItem>
            <SparklesIcon className="mr-2 h-4 w-4" />
            <span>Generate Fix Suggestion</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export function useCommandPalette() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return { open, setOpen }
}
