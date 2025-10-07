import { notFound } from 'next/navigation';
import Link from 'next/link';
import { AppShell } from '@/components/app-shell/app-shell';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getIssueDetail, listIssues, listRepos } from '@/lib/mock';

type PageProps = { params: { name: string; id: string } };

export default function IssueDetailPage({ params }: PageProps) {
  const repo = listRepos().find((r) => r.name === params.name);
  if (!repo) return notFound();
  const issue = getIssueDetail(params.id);
  if (!issue || issue.repoId !== repo.id) return notFound();

  return (
    <AppShell>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-xl font-semibold'>
              #{issue.number} · {issue.title}
            </h1>
            <div className='mt-1 flex items-center gap-2 text-sm text-muted-foreground'>
              <Link href={`/repo/${repo.name}/issues`} className='underline-offset-4 hover:underline'>
                {repo.fullName}
              </Link>
              <span>·</span>
              <Badge variant={issue.status === 'open' ? 'warning' : 'success'}>{issue.status}</Badge>
              {issue.aiUrgency && <Badge>{issue.aiUrgency}</Badge>}
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className='whitespace-pre-wrap text-sm'>{issue.bodyMarkdown}</pre>
          </CardContent>
        </Card>

        <div className='grid gap-4 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>AI Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='list-disc space-y-1 pl-5 text-sm text-muted-foreground'>
                <li>Persist filters in query params</li>
                <li>Add useEffect to hydrate filters from URL</li>
                <li>Write unit test for navigation back</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Related Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='list-disc space-y-1 pl-5 text-sm text-muted-foreground'>
                {listIssues(repo.id)
                  .filter((i) => i.id !== issue.id)
                  .slice(0, 3)
                  .map((i) => (
                    <li key={i.id}>
                      <Link className='underline-offset-4 hover:underline' href={`/repo/${params.name}/issues/${i.id}`}>
                        #{i.number} · {i.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
