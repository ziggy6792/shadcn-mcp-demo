import Link from 'next/link';
import { AppShell } from '@/components/app-shell/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { listRepos } from '@/lib/mock';

export default function DashboardPage() {
  const repos = listRepos();
  return (
    <AppShell>
      <div className='space-y-6'>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight'>Dashboard</h1>
          <p className='text-muted-foreground'>Overview of connected repositories.</p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {repos.map((repo) => (
            <Link key={repo.id} href={`/repo/${repo.name}/issues`}>
              <Card className='h-full transition-colors hover:bg-muted/50'>
                <CardHeader>
                  <CardTitle className='flex items-center justify-between'>
                    <span>{repo.fullName}</span>
                    <Badge>{repo.language ?? 'n/a'}</Badge>
                  </CardTitle>
                  <CardDescription>{repo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center justify-between text-sm text-muted-foreground'>
                    <span>⭐ {repo.stars}</span>
                    <span>Open issues: {repo.openIssuesCount}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div>
          <h2 className='text-lg font-medium'>AI Insights</h2>
          <div className='mt-2 grid gap-4 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>This week’s issue trends</CardTitle>
                <CardDescription>Mocked AI summary</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground'>Rising label: bug. Priority increase in filters and navigation related issues.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick actions</CardTitle>
                <CardDescription>Trigger mocked AI flows</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='text-sm text-muted-foreground list-disc pl-5 space-y-1'>
                  <li>Auto-prioritize issues</li>
                  <li>Summarize repo</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
