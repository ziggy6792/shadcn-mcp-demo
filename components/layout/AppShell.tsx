import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen'>
      <TopNav />
      <div className='grid grid-cols-1 md:grid-cols-[14rem_1fr]'>
        <Sidebar />
        <main className='p-4'>{children}</main>
      </div>
    </div>
  );
}
