'use client';
import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
type LoginValues = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  onSubmit?: (values: LoginValues) => Promise<void> | void;
  onGithubSignIn?: () => Promise<void> | void;
}

export function LoginForm({ onSubmit, onGithubSignIn }: LoginFormProps) {
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  async function handleSubmit(values: LoginValues) {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        await new Promise((r) => setTimeout(r, 600));
        throw new Error('Mock error: replace onSubmit prop to integrate auth');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGithub() {
    setSubmitError(null);
    try {
      if (onGithubSignIn) {
        await onGithubSignIn();
      } else {
        await new Promise((r) => setTimeout(r, 300));
        setSubmitError('Mock: wire up GitHub OAuth handler');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'GitHub sign-in failed';
      setSubmitError(message);
    }
  }

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Login to IssueMind</CardTitle>
      </CardHeader>
      <CardContent>
        {submitError ? (
          <Alert className='mb-4' role='alert'>
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        ) : null}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' inputMode='email' autoComplete='email' placeholder='m@example.com' {...field} />
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
                    <Input type='password' autoComplete='current-password' placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-col gap-2 pt-2'>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </Button>
              <Button type='button' variant='outline' onClick={handleGithub}>
                Sign in with GitHub
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
