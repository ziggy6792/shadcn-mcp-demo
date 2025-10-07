import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='mx-auto flex h-14 max-w-7xl items-center gap-3 px-4'>
        <Link href='/' className='flex items-center gap-2'>
          <Image src='/placeholder-logo.svg' alt='IssueMind' width={24} height={24} />
          <span className='font-semibold'>IssueMind</span>
        </Link>
        <div className='ml-auto flex items-center gap-2'>
          <Button asChild variant='ghost'>
            <Link href='/ai-tasks'>AI Tasks</Link>
          </Button>
          <Button variant='ghost' onClick={() => window.dispatchEvent(new Event('open-command-palette'))}>
            ⌘K
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
