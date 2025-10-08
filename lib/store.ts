// Simple client-side state management
type User = {
  name: string;
  email: string;
} | null;

type StoreState = {
  user: User;
  currentRepo: string | null;
};

class Store {
  private state: StoreState = {
    user: null,
    currentRepo: null,
  };

  private listeners: Set<() => void> = new Set();

  getState() {
    return this.state;
  }

  setState(partial: Partial<StoreState>) {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  // Helper methods
  setUser(user: User) {
    this.setState({ user });
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }
  }

  getUser(): User {
    if (typeof window !== 'undefined' && !this.state.user) {
      const stored = localStorage.getItem('user');
      if (stored) {
        this.state.user = JSON.parse(stored);
      }
    }
    return this.state.user;
  }

  setCurrentRepo(repo: string | null) {
    this.setState({ currentRepo: repo });
  }

  getCurrentRepo() {
    return this.state.currentRepo;
  }

  logout() {
    this.setUser(null);
    this.setCurrentRepo(null);
  }
}

export const store = new Store();
