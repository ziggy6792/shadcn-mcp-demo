import { AppShell } from '@/components/layout/AppShell';
import Link from 'next/link';

export default function Page() {
  return (
    <AppShell>
      <div className='grid place-items-center py-20'>
        <div className='text-center space-y-4'>
          <h1 className='text-2xl font-semibold'>Welcome to IssueMind</h1>
          <p className='text-muted-foreground'>Start at the dashboard or explore issues.</p>
          <div className='flex justify-center gap-3'>
            <Link className='underline' href='/dashboard'>
              Go to Dashboard
            </Link>
            <Link className='underline' href='/repo/issue-mind/issues'>
              View Issues
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
