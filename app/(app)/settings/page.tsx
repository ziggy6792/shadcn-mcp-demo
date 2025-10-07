'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Github, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Settings as SettingsType } from '@/lib/types';

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsType>({
    theme: 'dark',
    layoutDensity: 'comfortable',
    defaultRepoView: 'list',
    githubConnected: true,
    experimentalFeatures: {
      autoLabeling: true,
      autoSummary: false,
    },
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      toast.success('Settings saved successfully!');
    }, 1000);
  };

  const updateSetting = <K extends keyof SettingsType>(
    key: K,
    value: SettingsType[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const updateExperimentalFeature = (
    feature: keyof SettingsType['experimentalFeatures'],
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      experimentalFeatures: {
        ...prev.experimentalFeatures,
        [feature]: value,
      },
    }));
  };

  return (
    <div className="container py-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and integrations
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="experimental">Experimental</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how IssueMind looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value: any) => updateSetting('theme', value)}
                >
                  <SelectTrigger id="theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred theme or follow your system settings
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="density">Layout Density</Label>
                <Select
                  value={settings.layoutDensity}
                  onValueChange={(value: any) => updateSetting('layoutDensity', value)}
                >
                  <SelectTrigger id="density">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Adjust the spacing and size of UI elements
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="defaultView">Default Repository View</Label>
                <Select
                  value={settings.defaultRepoView}
                  onValueChange={(value: any) => updateSetting('defaultRepoView', value)}
                >
                  <SelectTrigger id="defaultView">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="list">List</SelectItem>
                    <SelectItem value="grid">Grid</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose how repositories are displayed on the dashboard
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>GitHub Integration</CardTitle>
              <CardDescription>
                Connect your GitHub account to access your repositories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    <Label className="text-base">GitHub Account</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {settings.githubConnected
                      ? 'Connected as alexdev'
                      : 'Not connected'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {settings.githubConnected ? (
                    <>
                      <Badge variant="default" className="bg-green-500">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                      <Button
                        variant="outline"
                        onClick={() => {
                          updateSetting('githubConnected', false);
                          toast.success('GitHub account disconnected');
                        }}
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <>
                      <Badge variant="secondary">
                        <XCircle className="h-3 w-3 mr-1" />
                        Not Connected
                      </Badge>
                      <Button
                        onClick={() => {
                          updateSetting('githubConnected', true);
                          toast.success('GitHub account connected!');
                        }}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Permissions</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Read repositories</Label>
                      <p className="text-xs text-muted-foreground">
                        Access to view your repositories and issues
                      </p>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Write issues</Label>
                      <p className="text-xs text-muted-foreground">
                        Create and update issues
                      </p>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Read user profile</Label>
                      <p className="text-xs text-muted-foreground">
                        Access to your basic profile information
                      </p>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>
                Manage API keys for programmatic access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This is a demo application. API access is not available.
                </p>
                <Button variant="outline" disabled>
                  Generate API Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experimental Tab */}
        <TabsContent value="experimental" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Experimental Features</CardTitle>
              <CardDescription>
                Try out new AI-powered features before they're released
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoLabeling" className="text-base">
                    Automatic Issue Labeling
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Let AI automatically suggest and apply labels to new issues
                  </p>
                </div>
                <Switch
                  id="autoLabeling"
                  checked={settings.experimentalFeatures.autoLabeling}
                  onCheckedChange={(checked) =>
                    updateExperimentalFeature('autoLabeling', checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoSummary" className="text-base">
                    Automatic Issue Summaries
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Generate AI summaries for issues with long discussions
                  </p>
                </div>
                <Switch
                  id="autoSummary"
                  checked={settings.experimentalFeatures.autoSummary}
                  onCheckedChange={(checked) =>
                    updateExperimentalFeature('autoSummary', checked)
                  }
                />
              </div>

              <Separator />

              <div className="rounded-lg bg-muted p-4">
                <h4 className="text-sm font-medium mb-2">About Experimental Features</h4>
                <p className="text-sm text-muted-foreground">
                  These features are in active development and may not work as expected.
                  Your feedback helps us improve them. You can disable them at any time.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions that affect your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Clear All AI Tasks</Label>
                  <p className="text-sm text-muted-foreground">
                    Remove all completed and failed AI tasks
                  </p>
                </div>
                <Button variant="outline" onClick={() => toast.info('All AI tasks cleared')}>
                  Clear Tasks
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-destructive">Reset All Settings</Label>
                  <p className="text-sm text-muted-foreground">
                    Reset all preferences to default values
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => toast.info('Settings reset to defaults')}
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
