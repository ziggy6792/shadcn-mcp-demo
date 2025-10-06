import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function Page() {
  return (
    <div className='grid gap-4 md:grid-cols-3'>
      <Card>
        <CardHeader>
          <CardTitle>Open Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-3xl font-semibold'>128</div>
          <Badge variant='secondary' className='mt-2'>
            +12 today
          </Badge>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>AI Summaries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <div className='text-sm text-muted-foreground'>Processing</div>
            <Progress value={42} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className='flex gap-2 text-sm text-muted-foreground'>Fix flaky tests • Triage new bugs</CardContent>
      </Card>
    </div>
  );
}
