import Link from 'next/link';
import { AppShell } from '@/components/app-shell/app-shell';
import { buttonVariants } from '@/components/ui/button';

export default function Page() {
  return (
    <AppShell>
      <div className='flex flex-col items-center justify-center gap-4 py-16'>
        <h1 className='text-2xl font-semibold'>Welcome to IssueMind</h1>
        <p className='text-muted-foreground'>Start by visiting your dashboard.</p>
        <Link href='/dashboard' className={buttonVariants({ variant: 'default', size: 'default' })}>
          Go to Dashboard
        </Link>
      </div>
    </AppShell>
  );
}
