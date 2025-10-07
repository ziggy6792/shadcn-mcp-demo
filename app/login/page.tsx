'use client';

import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setError(null);
      await new Promise((r) => setTimeout(r, 600));
      // Mock auth success
      if (values.email && values.password) {
        router.push('/dashboard');
      }
    } catch (e) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className='min-h-screen grid place-items-center p-4'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-xl'>Sign in to IssueMind</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className='mb-4' variant='destructive'>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder='you@example.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='••••••••' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
              <div className='text-xs text-muted-foreground'>
                By signing in, you agree to our{' '}
                <Link className='underline' href='#'>
                  Terms
                </Link>{' '}
                and{' '}
                <Link className='underline' href='#'>
                  Privacy
                </Link>
                .
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

