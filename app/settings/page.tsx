'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  return (
    <AppShell>
      <div className='space-y-4'>
        <h1 className='text-xl font-semibold'>Settings</h1>
        <Tabs defaultValue='general'>
          <TabsList>
            <TabsTrigger value='general'>General</TabsTrigger>
            <TabsTrigger value='integrations'>Integrations</TabsTrigger>
            <TabsTrigger value='experimental'>Experimental</TabsTrigger>
          </TabsList>
          <TabsContent value='general' className='space-y-6'>
            <div className='grid gap-2 max-w-sm'>
              <Label>Theme</Label>
              <Select value={theme} onValueChange={(v) => setTheme(v)}>
                <SelectTrigger>
                  <SelectValue placeholder='Theme' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='light'>Light</SelectItem>
                  <SelectItem value='dark'>Dark</SelectItem>
                  <SelectItem value='system'>System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          <TabsContent value='integrations' className='space-y-6'>
            <div className='flex items-center justify-between max-w-md'>
              <div className='space-y-1'>
                <div className='font-medium'>GitHub</div>
                <div className='text-sm text-muted-foreground'>Mock link status</div>
              </div>
              <Switch defaultChecked />
            </div>
          </TabsContent>
          <TabsContent value='experimental' className='space-y-6'>
            <div className='flex items-center justify-between max-w-md'>
              <div className='space-y-1'>
                <div className='font-medium'>Automatic labeling</div>
                <div className='text-sm text-muted-foreground'>Enable AI labeling</div>
              </div>
              <Switch />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
