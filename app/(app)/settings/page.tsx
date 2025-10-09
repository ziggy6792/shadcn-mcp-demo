'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import {
  SettingsIcon,
  MoonIcon,
  SunIcon,
  GithubIcon,
  BellIcon,
  ShieldIcon,
  SparklesIcon,
  CheckIcon,
} from 'lucide-react';
import { Tabs } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    name: 'Demo User',
    email: 'demo@issuemind.ai',
    autoLabeling: true,
    aiPriority: true,
    emailNotifications: true,
    webhookNotifications: false,
    githubConnected: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <BackgroundGradientAnimation />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="container mx-auto px-6 py-6">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <SettingsIcon className="h-8 w-8" />
              Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your account and application preferences
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 sticky top-24">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('general')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'general'
                        ? 'bg-accent text-accent-foreground font-semibold'
                        : 'hover:bg-accent/50'
                    }`}
                  >
                    General
                  </button>
                  <button
                    onClick={() => setActiveTab('integrations')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'integrations'
                        ? 'bg-accent text-accent-foreground font-semibold'
                        : 'hover:bg-accent/50'
                    }`}
                  >
                    Integrations
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'notifications'
                        ? 'bg-accent text-accent-foreground font-semibold'
                        : 'hover:bg-accent/50'
                    }`}
                  >
                    Notifications
                  </button>
                  <button
                    onClick={() => setActiveTab('experimental')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'experimental'
                        ? 'bg-accent text-accent-foreground font-semibold'
                        : 'hover:bg-accent/50'
                    }`}
                  >
                    Experimental
                  </button>
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
                    <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={settings.name}
                          onChange={(e) =>
                            setSettings({ ...settings, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={settings.email}
                          onChange={(e) =>
                            setSettings({ ...settings, email: e.target.value })
                          }
                        />
                      </div>
                      <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-semibold transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      {theme === 'dark' ? (
                        <MoonIcon className="h-5 w-5" />
                      ) : (
                        <SunIcon className="h-5 w-5" />
                      )}
                      Appearance
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-3 block">Theme</Label>
                        <div className="grid grid-cols-3 gap-3">
                          <button
                            onClick={() => setTheme('light')}
                            className={`p-4 rounded-lg border ${
                              theme === 'light'
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50'
                            } transition-colors`}
                          >
                            <SunIcon className="h-5 w-5 mx-auto mb-2" />
                            <div className="text-sm font-semibold">Light</div>
                          </button>
                          <button
                            onClick={() => setTheme('dark')}
                            className={`p-4 rounded-lg border ${
                              theme === 'dark'
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50'
                            } transition-colors`}
                          >
                            <MoonIcon className="h-5 w-5 mx-auto mb-2" />
                            <div className="text-sm font-semibold">Dark</div>
                          </button>
                          <button
                            onClick={() => setTheme('system')}
                            className={`p-4 rounded-lg border ${
                              theme === 'system'
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50'
                            } transition-colors`}
                          >
                            <SettingsIcon className="h-5 w-5 mx-auto mb-2" />
                            <div className="text-sm font-semibold">System</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Integrations */}
              {activeTab === 'integrations' && (
                <div className="space-y-6">
                  <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <GithubIcon className="h-5 w-5" />
                      GitHub Connection
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                        <div>
                          <div className="font-semibold">GitHub Account</div>
                          <div className="text-sm text-muted-foreground">
                            Connected as @demo-user
                          </div>
                        </div>
                        {settings.githubConnected ? (
                          <div className="flex items-center gap-2 text-green-500">
                            <CheckIcon className="h-5 w-5" />
                            <span className="text-sm font-semibold">Connected</span>
                          </div>
                        ) : (
                          <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                            Connect
                          </button>
                        )}
                      </div>
                      {settings.githubConnected && (
                        <button className="text-destructive hover:underline text-sm">
                          Disconnect GitHub
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
                    <h2 className="text-xl font-bold mb-4">API Access</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Generate API keys to integrate IssueMind with your tools
                    </p>
                    <button className="border border-border hover:bg-accent px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                      Generate API Key
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeTab === 'notifications' && (
                <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <BellIcon className="h-5 w-5" />
                    Notification Preferences
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <div className="font-semibold">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive updates about your issues via email
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggle('emailNotifications')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.emailNotifications ? 'bg-primary' : 'bg-muted'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.emailNotifications
                              ? 'translate-x-6'
                              : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <div className="font-semibold">Webhook Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Send notifications to external services
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggle('webhookNotifications')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.webhookNotifications ? 'bg-primary' : 'bg-muted'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.webhookNotifications
                              ? 'translate-x-6'
                              : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Experimental */}
              {activeTab === 'experimental' && (
                <div className="space-y-6">
                  <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <SparklesIcon className="h-5 w-5 text-purple-500" />
                      <h2 className="text-xl font-bold text-purple-500">
                        AI Features (Experimental)
                      </h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      These features are experimental and may change over time.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg border border-purple-500/20 bg-card">
                        <div>
                          <div className="font-semibold">Automatic Issue Labeling</div>
                          <div className="text-sm text-muted-foreground">
                            AI automatically suggests labels for new issues
                          </div>
                        </div>
                        <button
                          onClick={() => handleToggle('autoLabeling')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.autoLabeling ? 'bg-purple-500' : 'bg-muted'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.autoLabeling
                                ? 'translate-x-6'
                                : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg border border-purple-500/20 bg-card">
                        <div>
                          <div className="font-semibold">AI Priority Detection</div>
                          <div className="text-sm text-muted-foreground">
                            Automatically prioritize issues based on severity
                          </div>
                        </div>
                        <button
                          onClick={() => handleToggle('aiPriority')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.aiPriority ? 'bg-purple-500' : 'bg-muted'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.aiPriority ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <ShieldIcon className="h-5 w-5" />
                      Privacy & Data
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your data is processed securely and never shared with third
                      parties.
                    </p>
                    <button className="text-primary hover:underline text-sm">
                      View Privacy Policy
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
