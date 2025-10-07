import { AppShell } from '@/components/app-shell/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  return (
    <AppShell>
      <div className='space-y-6'>
        <h1 className='text-2xl font-semibold'>Settings</h1>
        <div className='grid gap-4 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>General</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='grid gap-2'>
                <Label htmlFor='displayName'>Display name</Label>
                <Input id='displayName' placeholder='Your name' />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
            </CardHeader>
            <CardContent className='text-sm text-muted-foreground'>Mock GitHub connection coming soon.</CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
