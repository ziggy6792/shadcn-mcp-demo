import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  return (
    <div className='flex min-h-[calc(100vh-56px)] items-center justify-center p-4'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Mocked GitHub OAuth</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Button className='w-full' asChild>
            <Link href='/dashboard'>Sign in with GitHub</Link>
          </Button>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Demo Email</Label>
            <Input id='email' type='email' placeholder='you@example.com' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type='password' />
          </div>
          <Button className='w-full' asChild>
            <Link href='/dashboard'>Continue (Demo)</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
