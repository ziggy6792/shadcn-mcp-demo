'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [model, setModel] = useState<string | undefined>();
  const [beta, setBeta] = useState(false);

  return (
    <Tabs defaultValue='general' className='space-y-4'>
      <TabsList>
        <TabsTrigger value='general'>General</TabsTrigger>
        <TabsTrigger value='integrations'>Integrations</TabsTrigger>
        <TabsTrigger value='experimental'>Experimental</TabsTrigger>
      </TabsList>
      <TabsContent value='general' className='space-y-4'>
        <div className='flex items-center gap-2'>
          <Switch id='dark-mode' checked={darkMode} onCheckedChange={setDarkMode} />
          <label htmlFor='dark-mode' className='text-sm'>
            Enable dark mode
          </label>
        </div>
        <div className='grid gap-2'>
          <label className='text-sm'>Preferred AI model</label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger>
              <SelectValue placeholder='Select a model' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='gpt-4o'>gpt-4o</SelectItem>
              <SelectItem value='gpt-4.1'>gpt-4.1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </TabsContent>
      <TabsContent value='integrations'>
        <div className='flex items-center gap-2'>
          <Checkbox id='github' />
          <label htmlFor='github' className='text-sm'>
            Connect GitHub
          </label>
        </div>
      </TabsContent>
      <TabsContent value='experimental'>
        <div className='flex items-center gap-2'>
          <Checkbox id='beta' checked={beta} onCheckedChange={(v) => setBeta(Boolean(v))} />
          <label htmlFor='beta' className='text-sm'>
            Enable beta features
          </label>
        </div>
      </TabsContent>
    </Tabs>
  );
}

