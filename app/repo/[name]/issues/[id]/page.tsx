import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

export default function Page({ params }: { params: { name: string; id: string } }) {
  const { name, id } = params;
  return (
    <div className='grid gap-4 lg:grid-cols-[1fr_24rem]'>
      <Card>
        <CardHeader>
          <CardTitle>
            Issue #{id} in {name}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='prose prose-sm dark:prose-invert max-w-none'>
            <p>Issue description would render here.</p>
          </div>
          <Separator />
          <div className='space-y-2'>
            <h4 className='text-sm font-medium'>Comments</h4>
            <div className='space-y-2 max-h-64 overflow-auto'>
              {[1, 2, 3].map((c) => (
                <div key={c} className='rounded-md border p-2 text-sm'>
                  Comment {c}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className='space-y-4'>
        <Tabs defaultValue='suggestions'>
          <TabsList>
            <TabsTrigger value='suggestions'>Suggestions</TabsTrigger>
            <TabsTrigger value='related'>Related</TabsTrigger>
          </TabsList>
          <TabsContent value='suggestions'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='a'>
                <AccordionTrigger>AI Summary</AccordionTrigger>
                <AccordionContent>The AI thinks this is a duplicate of #42.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value='related'>
            <div className='text-sm text-muted-foreground'>Related issues would appear here.</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
