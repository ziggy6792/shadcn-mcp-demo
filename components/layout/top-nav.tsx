'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, User, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { store } from '@/lib/store';
import { useTheme } from 'next-themes';

export function TopNav() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState(store.getUser());
  const [currentRepo, setCurrentRepo] = useState(store.getCurrentRepo());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const unsubscribe = store.subscribe(() => {
      setUser(store.getUser());
      setCurrentRepo(store.getCurrentRepo());
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    store.logout();
    router.push('/login');
  };

  const handleRepoChange = (value: string) => {
    store.setCurrentRepo(value);
    router.push(`/repo/${value}/issues`);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center gap-4 flex-1">
        <Select value={currentRepo || undefined} onValueChange={handleRepoChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select repository" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="react-app">acme-corp/react-app</SelectItem>
            <SelectItem value="api-gateway">acme-corp/api-gateway</SelectItem>
            <SelectItem value="data-pipeline">acme-corp/data-pipeline</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search issues... (⌘K)"
            className="w-full rounded-lg border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
