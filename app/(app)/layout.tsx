import { NavBar } from '@/components/layout/nav-bar';
import { Sidebar } from '@/components/layout/sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="flex">
        <aside className="hidden md:flex w-64 border-r">
          <Sidebar />
        </aside>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
