import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select } from '@/components/ui/select';

export default function Page() {
  return (
    <Tabs defaultValue='general'>
      <TabsList>
        <TabsTrigger value='general'>General</TabsTrigger>
        <TabsTrigger value='integrations'>Integrations</TabsTrigger>
        <TabsTrigger value='experimental'>Experimental</TabsTrigger>
      </TabsList>
      <TabsContent value='general'>
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <label className='flex items-center gap-3 text-sm'>
              <Switch /> Enable dark mode
            </label>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Default repo</label>
              <Select>
                <option>Repo A</option>
                <option>Repo B</option>
              </Select>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='integrations'>
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
          </CardHeader>
          <CardContent className='text-sm text-muted-foreground'>Connect GitHub, Sentry, etc.</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='experimental'>
        <Card>
          <CardHeader>
            <CardTitle>Experimental</CardTitle>
          </CardHeader>
          <CardContent className='text-sm text-muted-foreground'>Feature flags go here.</CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
