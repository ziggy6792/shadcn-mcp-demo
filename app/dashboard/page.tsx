import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { repositories } from '@/lib/mocks/data';

export default function DashboardPage() {
  return (
    <AppShell>
      <div className='space-y-6'>
        <h1 className='text-xl font-semibold'>Dashboard</h1>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {repositories.map((repo) => (
            <Card key={repo.name}>
              <CardHeader>
                <CardTitle className='text-base'>{repo.fullName}</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2 text-sm text-muted-foreground'>
                <p>{repo.description}</p>
                <div className='grid grid-cols-3 gap-2'>
                  <div>
                    <span className='text-foreground font-medium'>{repo.stars}</span> ⭐
                  </div>
                  <div>
                    <span className='text-foreground font-medium'>{repo.openIssues}</span> issues
                  </div>
                  <div>updated just now</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <h2 className='mb-3 text-sm font-medium text-muted-foreground'>This week’s issue trends</h2>
          <div className='grid gap-3 sm:grid-cols-3'>
            <Skeleton className='h-24' />
            <Skeleton className='h-24' />
            <Skeleton className='h-24' />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
