'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GithubIcon, BotIcon, SparklesIcon } from 'lucide-react';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MovingBorder } from '@/components/ui/moving-border';
import { Spotlight } from '@/components/ui/spotlight';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    // Simulate GitHub OAuth
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push('/dashboard');
  };

  const handleDemoLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate demo login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <BackgroundBeams className="absolute inset-0 z-0" />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BotIcon className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              IssueMind
            </h1>
          </div>
          <TextGenerateEffect
            words="AI-Powered GitHub Issue Solver"
            className="text-xl text-muted-foreground"
          />
          <p className="mt-2 text-sm text-muted-foreground">
            Triage, prioritize, and solve issues faster with AI
          </p>
        </div>

        <div className="backdrop-blur-sm bg-card/50 border border-border rounded-2xl p-8 shadow-xl">
          {/* GitHub Login Button */}
          <button
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="w-full mb-6 group"
          >
            <MovingBorder
              duration={3000}
              className="bg-card hover:bg-accent transition-colors"
            >
              <div className="flex items-center justify-center gap-3 px-8 py-4">
                <GithubIcon className="h-5 w-5" />
                <span className="font-semibold">
                  {isLoading ? 'Connecting...' : 'Continue with GitHub'}
                </span>
              </div>
            </MovingBorder>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or try demo
              </span>
            </div>
          </div>

          {/* Demo Login Form */}
          <form onSubmit={handleDemoLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="demo@issuemind.ai"
                defaultValue="demo@issuemind.ai"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                defaultValue="demo1234"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login to Demo'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            By continuing, you agree to our{' '}
            <Link href="#" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <SparklesIcon className="h-4 w-4" />
            <span>Powered by AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
