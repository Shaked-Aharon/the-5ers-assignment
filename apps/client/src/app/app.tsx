import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from '../stores/store.provider';
import { Constant } from '../constant';
import router from './router';

export function App() {

  const { authStore, financialsStore } = useStore();

  useEffect(() => {
    if (localStorage.getItem(Constant.localStorageKeys.Token)) {
      authStore.fetchUser();
    }
  }, [authStore]);

  useEffect(() => {
    if (authStore.user) {
      financialsStore.initialData();
    }
  }, [authStore.loading]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
