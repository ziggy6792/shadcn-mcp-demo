import { AppShell } from '@/components/app-shell/app-shell';
import { listAITasks } from '@/lib/mock';

export default function AITasksPage() {
  const tasks = listAITasks();
  return (
    <AppShell>
      <div className='space-y-4'>
        <h1 className='text-2xl font-semibold'>AI Tasks</h1>
        <div className='overflow-hidden rounded-md border'>
          <table className='w-full text-sm'>
            <thead className='bg-muted/50 text-left'>
              <tr>
                <th className='p-3 font-medium'>Task</th>
                <th className='p-3 font-medium'>Status</th>
                <th className='p-3 font-medium'>Created</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id} className='border-t'>
                  <td className='p-3'>{t.name}</td>
                  <td className='p-3 capitalize'>{t.status}</td>
                  <td className='p-3'>{new Date(t.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
