'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Github, Check } from 'lucide-react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [layoutDensity, setLayoutDensity] = useState('comfortable');
  const [defaultView, setDefaultView] = useState('table');
  const [autoLabeling, setAutoLabeling] = useState(true);
  const [summaryGeneration, setSummaryGeneration] = useState(true);
  const [githubConnected, setGithubConnected] = useState(true);

  const handleSaveGeneral = () => {
    toast.success('General settings saved successfully!');
  };

  const handleSaveExperimental = () => {
    toast.success('Experimental settings saved successfully!');
  };

  const handleGitHubToggle = () => {
    if (githubConnected) {
      toast.success('GitHub account disconnected');
      setGithubConnected(false);
    } else {
      toast.success('Redirecting to GitHub...');
      setTimeout(() => {
        setGithubConnected(true);
        toast.success('GitHub account connected!');
      }, 1500);
    }
  };

  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure your preferences and integrations
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="experimental">Experimental</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how IssueMind looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <div className="text-sm text-muted-foreground">
                      Use dark theme across the application
                    </div>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="layout-density">Layout Density</Label>
                  <Select value={layoutDensity} onValueChange={setLayoutDensity}>
                    <SelectTrigger id="layout-density">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Control spacing and padding in the interface
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="default-view">Default Repository View</Label>
                  <Select value={defaultView} onValueChange={setDefaultView}>
                    <SelectTrigger id="default-view">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="table">Table View</SelectItem>
                      <SelectItem value="grid">Grid View</SelectItem>
                      <SelectItem value="list">List View</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose how issues are displayed by default
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive email updates for assigned issues
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>AI Task Completion</Label>
                    <div className="text-sm text-muted-foreground">
                      Get notified when AI tasks finish
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSaveGeneral}>Save Changes</Button>
            </div>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>GitHub Integration</CardTitle>
                <CardDescription>
                  Connect your GitHub account to sync repositories and issues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Github className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">GitHub</div>
                      <div className="text-sm text-muted-foreground">
                        {githubConnected
                          ? 'Connected as alice@example.com'
                          : 'Not connected'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {githubConnected && (
                      <Badge variant="secondary" className="gap-1">
                        <Check className="h-3 w-3" />
                        Connected
                      </Badge>
                    )}
                    <Button
                      variant={githubConnected ? 'outline' : 'default'}
                      onClick={handleGitHubToggle}
                    >
                      {githubConnected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>

                {githubConnected && (
                  <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                    <div className="text-sm font-medium">Permissions</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>✓ Read repository issues</li>
                      <li>✓ Create and update issues</li>
                      <li>✓ Add comments and labels</li>
                      <li>✓ Read pull requests</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>
                  Manage API keys and webhooks for external integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>API Key</Label>
                    <div className="flex gap-2 mt-2">
                      <code className="flex-1 px-3 py-2 bg-muted rounded-md text-sm font-mono">
                        im_••••••••••••••••••••••••••••
                      </code>
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Webhooks</Label>
                      <Button variant="outline" size="sm">
                        Add Webhook
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No webhooks configured
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experimental Features */}
          <TabsContent value="experimental" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Features</CardTitle>
                <CardDescription>
                  Enable experimental AI-powered features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="auto-labeling">Auto Labeling</Label>
                      <Badge variant="outline" className="text-xs">
                        Beta
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Automatically suggest labels for new issues using AI
                    </div>
                  </div>
                  <Switch
                    id="auto-labeling"
                    checked={autoLabeling}
                    onCheckedChange={setAutoLabeling}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="summary-gen">Summary Generation</Label>
                      <Badge variant="outline" className="text-xs">
                        Beta
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Generate automatic summaries of long discussions
                    </div>
                  </div>
                  <Switch
                    id="summary-gen"
                    checked={summaryGeneration}
                    onCheckedChange={setSummaryGeneration}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Label>Smart Issue Routing</Label>
                      <Badge variant="outline" className="text-xs">
                        Coming Soon
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      AI-powered assignment recommendations
                    </div>
                  </div>
                  <Switch disabled />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Options</CardTitle>
                <CardDescription>
                  Experimental features that may affect performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Real-time Collaboration</Label>
                    <div className="text-sm text-muted-foreground">
                      See live updates from team members
                    </div>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Code Preview</Label>
                    <div className="text-sm text-muted-foreground">
                      Inline code previews in issue descriptions
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSaveExperimental}>Save Changes</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
