import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Suspense } from 'react';

type RepoRow = { name: string; openIssues: number; lastUpdated: string };

async function fetchRepos(): Promise<RepoRow[]> {
  await new Promise((r) => setTimeout(r, 500));
  return [
    { name: 'demo-repo', openIssues: 12, lastUpdated: '2h ago' },
    { name: 'alpha', openIssues: 4, lastUpdated: '1d ago' },
  ];
}

async function ReposTable() {
  const rows = await fetchRepos();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Repository</TableHead>
          <TableHead className='text-right'>Open Issues</TableHead>
          <TableHead>Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.name}>
            <TableCell className='font-medium'>{r.name}</TableCell>
            <TableCell className='text-right'>{r.openIssues}</TableCell>
            <TableCell>{r.lastUpdated}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function DashboardPage() {
  return (
    <div className='grid gap-6'>
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div>
              <div className='text-sm text-muted-foreground'>Open Issues</div>
              <div className='text-2xl font-semibold'>16</div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground'>AI Tasks</div>
              <div className='text-2xl font-semibold'>5</div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground'>Resolved this week</div>
              <div className='text-2xl font-semibold'>9</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Repositories</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className='space-y-2'>
                <Skeleton className='h-6 w-1/3' />
                <Skeleton className='h-6 w-full' />
                <Skeleton className='h-6 w-2/3' />
              </div>
            }>
            {/* @ts-expect-error Async Server Component */}
            <ReposTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

