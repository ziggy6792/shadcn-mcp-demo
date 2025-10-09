"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Brain, Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Particles } from "@/components/ui/particles";
import { RetroGrid } from "@/components/ui/retro-grid";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await login("demo@issuemind.com", "demo");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <RetroGrid className="absolute inset-0" />
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />

      <div className="relative z-10 w-full max-w-md px-4">
        <BlurFade delay={0.1} inView>
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="relative">
                <Brain className="h-16 w-16 text-primary" />
                <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full animate-pulse" />
              </div>
            </div>
            <AnimatedGradientText className="text-4xl font-bold mb-2">
              IssueMind
            </AnimatedGradientText>
            <p className="text-muted-foreground text-lg">
              AI-Powered GitHub Issue Solver
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.25} inView>
          <Card className="backdrop-blur-sm bg-background/95 border-2">
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign in
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <ShimmerButton
                  className="w-full"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                >
                  <Github className="mr-2 h-4 w-4" />
                  Continue with GitHub
                </ShimmerButton>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Try Demo Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </BlurFade>
      </div>
    </div>
  );
}
