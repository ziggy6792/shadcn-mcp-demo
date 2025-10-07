'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { mockRepositories, mockIssues } from '@/lib/mock-data';
import {
  FileText,
  Github,
  LayoutDashboard,
  Settings,
  Sparkles,
  Search,
} from 'lucide-react';

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (callback: () => void) => {
    setOpen(false);
    callback();
  };

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
              onSelect={() =>
                runCommand(() => router.push(`/repo/${repo.name}/issues`))
              }
            >
              <Github className="mr-2 h-4 w-4" />
              <span>{repo.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {repo.openIssues} open
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Recent Issues">
          {mockIssues.slice(0, 5).map((issue) => (
            <CommandItem
              key={issue.id}
              onSelect={() =>
                runCommand(() =>
                  router.push(`/repo/${issue.repository}/issues/${issue.id}`)
                )
              }
            >
              <FileText className="mr-2 h-4 w-4" />
              <span className="truncate">
                {issue.title}
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                #{issue.number}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
