"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2Icon } from "lucide-react"
import { toast } from "sonner"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [compactMode, setCompactMode] = React.useState(false)
  const [autoLabel, setAutoLabel] = React.useState(true)
  const [aiSuggestions, setAiSuggestions] = React.useState(true)
  const [mounted, setMounted] = React.useState(false)

  // Prevent hydration mismatch with theme
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleSaveGeneral = () => {
    toast.success("General settings saved!")
  }

  const handleReconnectGitHub = () => {
    toast.loading("Reconnecting to GitHub...")
    setTimeout(() => {
      toast.success("Successfully reconnected to GitHub!")
    }, 1500)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application preferences and integrations
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="experimental">Experimental</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Choose how IssueMind looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="theme-select">Appearance</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme-select" className="w-full">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Select your preferred theme or sync with system settings
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Layout</CardTitle>
              <CardDescription>
                Customize your workspace layout
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-mode">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Reduce spacing and padding for a denser layout
                  </p>
                </div>
                <Switch
                  id="compact-mode"
                  checked={compactMode}
                  onCheckedChange={setCompactMode}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Integration Settings */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>GitHub Connection</CardTitle>
              <CardDescription>
                Manage your GitHub integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <CheckCircle2Icon className="h-4 w-4" />
                <AlertDescription>
                  Connected as <strong>developer</strong> with full access to
                  repositories
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={handleReconnectGitHub}>
                Reconnect GitHub
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Configure API endpoints and rate limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label>API Rate Limit</Label>
                <div className="text-sm text-muted-foreground">
                  5,000 requests per hour
                </div>
              </div>
              <Separator />
              <div className="flex flex-col gap-2">
                <Label>Webhook Status</Label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm text-muted-foreground">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experimental Features */}
        <TabsContent value="experimental" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Experimental Features</CardTitle>
              <CardDescription>
                Try out new AI-powered capabilities (may be unstable)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-label">AI Auto-Label</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically label issues using AI analysis
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
                  <Label htmlFor="ai-suggestions">AI Suggestions</Label>
                  <p className="text-sm text-muted-foreground">
                    Get real-time AI-powered fix suggestions
                  </p>
                </div>
                <Switch
                  id="ai-suggestions"
                  checked={aiSuggestions}
                  onCheckedChange={setAiSuggestions}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smart-priority">Smart Priority</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically prioritize issues based on impact
                  </p>
                </div>
                <Switch id="smart-priority" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast.success("Experimental settings saved!")}>
                Save Experimental Settings
              </Button>
            </CardFooter>
          </Card>

          <Alert>
            <AlertDescription>
              <strong>Note:</strong> Experimental features may change or be removed
              without notice. Use at your own risk.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
}
