'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { listRepos } from '@/lib/mock';

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('open-command-palette', onOpenEvent as EventListener);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('open-command-palette', onOpenEvent as EventListener);
    };
  }, []);

  const repos = listRepos();

  if (!open) return null;
  return (
    <div className='fixed inset-0 z-[200] bg-black/30 p-4' onClick={() => setOpen(false)}>
      <div
        role='dialog'
        aria-modal='true'
        className='mx-auto w-full max-w-xl overflow-hidden rounded-lg border bg-background shadow-2xl'
        onClick={(e) => e.stopPropagation()}>
        <Command value={value} onValueChange={setValue} label='Global Command Palette'>
          <div className='border-b p-3'>
            <Command.Input placeholder='Type a command or search...' className='h-10 w-full bg-transparent outline-none' />
          </div>
          <Command.List className='max-h-[320px] overflow-auto p-2'>
            <Command.Empty className='p-2 text-sm text-muted-foreground'>No results found.</Command.Empty>
            <Command.Group heading='Navigation' className='text-xs text-muted-foreground'>
              <Command.Item onSelect={() => router.push('/dashboard')} className='cursor-pointer rounded-md p-2 text-foreground'>
                Go to Dashboard
              </Command.Item>
              <Command.Item onSelect={() => router.push('/ai-tasks')} className='cursor-pointer rounded-md p-2 text-foreground'>
                Open AI Tasks
              </Command.Item>
              <Command.Item onSelect={() => router.push('/settings')} className='cursor-pointer rounded-md p-2 text-foreground'>
                Open Settings
              </Command.Item>
            </Command.Group>
            <Command.Group heading='Repositories' className='text-xs text-muted-foreground'>
              {repos.map((r) => (
                <Command.Item key={r.id} onSelect={() => router.push(`/repo/${r.name}/issues`)} className='cursor-pointer rounded-md p-2 text-foreground'>
                  {r.fullName}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
