"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Github, Sparkles, Moon, Sun, Monitor } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [autoLabel, setAutoLabel] = useState(true);
  const [autoSummary, setAutoSummary] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkModeDefault, setDarkModeDefault] = useState(true);

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="lg:pl-64 pt-16">
        <main className="p-8">
          <BlurFade delay={0.1} inView>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <SettingsIcon className="h-8 w-8" />
                <h1 className="text-4xl font-bold">Settings</h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Manage your preferences and integrations
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.15} inView>
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="experimental">Experimental</TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Customize how IssueMind looks and feels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Theme</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <button
                          onClick={() => setTheme("light")}
                          className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                            theme === "light"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Sun className="h-6 w-6" />
                          <span className="text-sm font-medium">Light</span>
                        </button>
                        <button
                          onClick={() => setTheme("dark")}
                          className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                            theme === "dark"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Moon className="h-6 w-6" />
                          <span className="text-sm font-medium">Dark</span>
                        </button>
                        <button
                          onClick={() => setTheme("system")}
                          className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                            theme === "system"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Monitor className="h-6 w-6" />
                          <span className="text-sm font-medium">System</span>
                        </button>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Default to dark mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically use dark mode when opening the app
                        </p>
                      </div>
                      <Switch
                        checked={darkModeDefault}
                        onCheckedChange={setDarkModeDefault}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications for issue updates and AI completions
                        </p>
                      </div>
                      <Switch
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Repository Defaults</CardTitle>
                    <CardDescription>
                      Set default view preferences for repositories
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Default issue view</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="justify-start">
                          List View
                        </Button>
                        <Button variant="outline" className="justify-start">
                          Card View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Integrations */}
              <TabsContent value="integrations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Connected Services</CardTitle>
                    <CardDescription>
                      Manage your connected accounts and integrations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Github className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">GitHub</h3>
                          <p className="text-sm text-muted-foreground">
                            Connected as johndoe
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Disconnect</Button>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">Available Integrations</h4>
                      <div className="grid gap-3">
                        <div className="flex items-center justify-between p-4 rounded-lg border border-dashed">
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-muted">
                              <Sparkles className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                              <h3 className="font-semibold">OpenAI</h3>
                              <p className="text-sm text-muted-foreground">
                                Enhanced AI capabilities
                              </p>
                            </div>
                          </div>
                          <Button variant="outline">Connect</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Experimental Features */}
              <TabsContent value="experimental" className="space-y-6">
                <Card className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      AI Features
                    </CardTitle>
                    <CardDescription>
                      Enable experimental AI-powered features (may affect performance)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 relative">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Automatic issue labeling</Label>
                        <p className="text-sm text-muted-foreground">
                          AI automatically suggests labels for new issues
                        </p>
                      </div>
                      <Switch checked={autoLabel} onCheckedChange={setAutoLabel} />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-generate summaries</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically create AI summaries for long discussions
                        </p>
                      </div>
                      <Switch
                        checked={autoSummary}
                        onCheckedChange={setAutoSummary}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Predictive issue detection</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about potential issues before they're reported
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Smart code suggestions</Label>
                        <p className="text-sm text-muted-foreground">
                          AI provides context-aware code fix recommendations
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Beta Features</CardTitle>
                    <CardDescription>
                      Try out new features before they're released
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg border border-dashed">
                      <h4 className="font-semibold mb-1">Multi-repository analysis</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Analyze patterns across multiple repositories simultaneously
                      </p>
                      <Button variant="outline" size="sm">
                        Enable Beta
                      </Button>
                    </div>

                    <div className="p-4 rounded-lg border border-dashed">
                      <h4 className="font-semibold mb-1">AI Code Review</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get automated code reviews powered by AI
                      </p>
                      <Button variant="outline" size="sm">
                        Enable Beta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </BlurFade>

          {/* Save Button */}
          <BlurFade delay={0.2} inView>
            <div className="mt-8 flex justify-end">
              <ShinyButton onClick={handleSaveSettings}>
                Save Changes
              </ShinyButton>
            </div>
          </BlurFade>
        </main>
      </div>
    </>
  );
}
