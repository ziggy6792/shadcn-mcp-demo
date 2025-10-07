'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  LayoutDashboard,
  GitPullRequest,
  Sparkles,
  Settings,
  Github,
  FileText,
  Code,
  MessageSquare,
} from 'lucide-react'
import { mockRepositories, mockIssues } from '@/lib/mock-data'

export function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  // Flatten all issues for search
  const allIssues = Object.entries(mockIssues).flatMap(([repoId, issues]) => {
    const repo = mockRepositories.find(r => r.id === repoId)
    return issues.map(issue => ({
      ...issue,
      repoName: repo?.name || '',
      repoFullName: repo?.fullName || ''
    }))
  })

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => router.push('/dashboard'))}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/ai-tasks'))}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            <span>AI Tasks</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/settings'))}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Repositories">
          {mockRepositories.map((repo) => (
            <CommandItem
              key={repo.id}
              onSelect={() => runCommand(() => router.push(`/repo/${repo.name}/issues`))}
            >
              <Github className="mr-2 h-4 w-4" />
              <span>{repo.fullName}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Recent Issues">
          {allIssues.slice(0, 5).map((issue) => (
            <CommandItem
              key={issue.id}
              onSelect={() => runCommand(() => router.push(`/repo/${issue.repoName}/issues/${issue.number}`))}
            >
              <GitPullRequest className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span className="font-medium">{issue.title}</span>
                <span className="text-xs text-muted-foreground">
                  {issue.repoFullName} #{issue.number}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="AI Actions">
          <CommandItem
            onSelect={() => {
              setOpen(false)
              // This would trigger the AI explain action
            }}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Explain Current Issue</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false)
              // This would trigger the AI fix action
            }}
          >
            <Code className="mr-2 h-4 w-4" />
            <span>Generate Fix</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false)
              // This would trigger the AI summarize action
            }}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Summarize Issue</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
