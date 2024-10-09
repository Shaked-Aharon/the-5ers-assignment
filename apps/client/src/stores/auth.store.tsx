import { makeAutoObservable, runInAction } from 'mobx';
import { IErrResponse, IUser } from '../interfaces';
import { profile } from '../services/users.service';

class AuthStore {
  user: IUser | null = null;
  isAuthenticated: boolean = false;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: IUser) {
    this.user = user;
    this.isAuthenticated = true;
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
  }

  // Example method to simulate fetching user details (use real API call in production)
  async fetchUser() {
    this.loading = true;
    try {
      // Simulate an API call
      const userData: IUser | IErrResponse = await profile();
      if ('error' in userData) throw userData;
      runInAction(() => {
        this.setUser(userData);
        this.loading = false;
      });
    } catch (error) {
      localStorage.removeItem('token');
      runInAction(() => {
        this.loading = false;
      });
      console.error('Failed to fetch user', error);
    }
  }
}

const authStore = new AuthStore();
export default authStore;
