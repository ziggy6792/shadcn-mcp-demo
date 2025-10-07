import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/app-shell/app-shell';
import { Button } from '@/components/ui/button';
import { AiAssistDrawer } from '@/components/ai/ai-assist-drawer';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { listRepos, listIssues } from '@/lib/mock';

type PageProps = {
  params: { name: string };
  searchParams: { q?: string; status?: string };
};

export default function RepoIssuesPage({ params, searchParams }: PageProps) {
  const repo = listRepos().find((r) => r.name === params.name);
  if (!repo) return notFound();

  const q = (searchParams.q ?? '').toLowerCase();
  const statusFilter = searchParams.status as 'open' | 'closed' | undefined;
  const issues = listIssues(repo.id).filter((i) => {
    const matchesQuery = !q || i.title.toLowerCase().includes(q);
    const matchesStatus = !statusFilter || i.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <AppShell>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-xl font-semibold'>{repo.fullName} · Issues</h1>
            <p className='text-sm text-muted-foreground'>Triaging workspace</p>
          </div>
          <div className='flex items-center gap-2 text-sm'>
            <Link href={`/repo/${repo.name}/issues?status=open`} className='underline-offset-4 hover:underline'>
              Open
            </Link>
            <span className='text-muted-foreground'>·</span>
            <Link href={`/repo/${repo.name}/issues?status=closed`} className='underline-offset-4 hover:underline'>
              Closed
            </Link>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Input placeholder='Search issues' defaultValue={searchParams.q} />
          <Button onClick={() => window.dispatchEvent(new Event('open-ai-assist'))} className='ml-auto' variant='secondary'>
            Open AI Assist
          </Button>
        </div>
        <div className='divide-y rounded-md border'>
          {issues.map((issue) => (
            <Link key={issue.id} href={`/repo/${repo.name}/issues/${issue.id}`} className='block px-4 py-3 hover:bg-muted/50'>
              <div className='flex items-center justify-between'>
                <div className='font-medium'>
                  #{issue.number} · {issue.title}
                </div>
                <div className='flex items-center gap-2'>
                  <Badge variant={issue.status === 'open' ? 'warning' : 'success'}>{issue.status}</Badge>
                  {issue.aiUrgency && <Badge>{issue.aiUrgency}</Badge>}
                </div>
              </div>
              {issue.aiSummary && <p className='mt-1 text-sm text-muted-foreground line-clamp-1'>{issue.aiSummary}</p>}
            </Link>
          ))}
          {issues.length === 0 && <div className='p-4 text-sm text-muted-foreground'>No issues found.</div>}
        </div>
      </div>
      <AiAssistDrawer />
    </AppShell>
  );
}
