'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { store } from '@/lib/store';
import { toast } from 'sonner';
import { Settings as SettingsIcon, Palette, Zap, Github } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Local state for settings
  const [autoLabel, setAutoLabel] = useState(false);
  const [autoSummary, setAutoSummary] = useState(true);
  const [githubConnected, setGithubConnected] = useState(true);
  const [layoutDensity, setLayoutDensity] = useState('comfortable');

  useEffect(() => {
    setMounted(true);
    const user = store.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    // Load settings from localStorage
    const savedAutoLabel = localStorage.getItem('autoLabel');
    const savedAutoSummary = localStorage.getItem('autoSummary');
    const savedLayoutDensity = localStorage.getItem('layoutDensity');

    if (savedAutoLabel !== null) setAutoLabel(savedAutoLabel === 'true');
    if (savedAutoSummary !== null) setAutoSummary(savedAutoSummary === 'true');
    if (savedLayoutDensity) setLayoutDensity(savedLayoutDensity);
  }, [router]);

  const handleSave = () => {
    localStorage.setItem('autoLabel', autoLabel.toString());
    localStorage.setItem('autoSummary', autoSummary.toString());
    localStorage.setItem('layoutDensity', layoutDensity);
    toast.success('Settings saved successfully!');
  };

  const handleDisconnectGithub = () => {
    setGithubConnected(false);
    toast.success('GitHub disconnected');
  };

  const handleConnectGithub = () => {
    setGithubConnected(true);
    toast.success('GitHub connected');
  };

  if (!mounted) {
    return null;
  }

  return (
    <AppLayout>
      <div className="container mx-auto p-6 max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your preferences and integrations
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general" className="gap-2">
              <SettingsIcon className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2">
              <Github className="h-4 w-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="experimental" className="gap-2">
              <Zap className="h-4 w-4" />
              Experimental
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how the application looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred color scheme
                    </p>
                  </div>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Layout Density</Label>
                    <p className="text-sm text-muted-foreground">
                      Adjust spacing and component size
                    </p>
                  </div>
                  <Select value={layoutDensity} onValueChange={setLayoutDensity}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Default Views</CardTitle>
                <CardDescription>
                  Set your preferred default views
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Default Repository View</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose what to show when opening a repository
                    </p>
                  </div>
                  <Select defaultValue="issues">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="issues">Issues List</SelectItem>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="ai-insights">AI Insights</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  GitHub Integration
                </CardTitle>
                <CardDescription>
                  Manage your GitHub connection and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <p className="font-medium">Connection Status</p>
                    <p className="text-sm text-muted-foreground">
                      {githubConnected ? 'Connected to GitHub' : 'Not connected'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {githubConnected ? (
                      <>
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm text-green-500">Active</span>
                      </>
                    ) : (
                      <>
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <span className="text-sm text-red-500">Inactive</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Permissions</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ Read repository data</li>
                    <li>✓ Read and write issues</li>
                    <li>✓ Read pull requests</li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  {githubConnected ? (
                    <Button variant="destructive" onClick={handleDisconnectGithub}>
                      Disconnect GitHub
                    </Button>
                  ) : (
                    <Button onClick={handleConnectGithub}>Connect GitHub</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experimental" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Experimental Features</CardTitle>
                <CardDescription>
                  Try out new AI-powered features (may be unstable)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-label">Automatic Labeling</Label>
                    <p className="text-sm text-muted-foreground">
                      Let AI automatically suggest and apply labels to new issues
                    </p>
                  </div>
                  <Switch
                    id="auto-label"
                    checked={autoLabel}
                    onCheckedChange={setAutoLabel}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-summary">Automatic Summarization</Label>
                    <p className="text-sm text-muted-foreground">
                      Generate AI summaries for long discussion threads
                    </p>
                  </div>
                  <Switch
                    id="auto-summary"
                    checked={autoSummary}
                    onCheckedChange={setAutoSummary}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="predictive-priority">Predictive Priority</Label>
                    <p className="text-sm text-muted-foreground">
                      AI predicts issue priority based on content and history
                    </p>
                  </div>
                  <Switch id="predictive-priority" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="code-suggestions">Code Suggestions</Label>
                    <p className="text-sm text-muted-foreground">
                      Generate code fix suggestions for reported bugs
                    </p>
                  </div>
                  <Switch id="code-suggestions" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/50 bg-yellow-500/5">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Experimental features are subject to change and may not work as expected.
                  Your feedback helps us improve these features.
                </p>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
