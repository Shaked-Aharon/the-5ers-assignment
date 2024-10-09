import RootLayout from './_layout';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home.page';
import { StockDetails } from './pages/stock-details.page';
import LoginPage from './pages/login.page';
import RegisterPage from './pages/register.page';
import AuthGuard from '../guards/auth.guard';
import { useEffect } from 'react';
import { useStore } from '../stores/store.provider';
import FavoriteStocksPage from './pages/favorite-stocks.page';
import { Constant } from '../constant';

export function App() {

  const { authStore, financialsStore } = useStore();

  useEffect(() => {
    if (localStorage.getItem(Constant.localStorageKeys.Token)) {
      authStore.fetchUser();
    }
  }, [authStore]);

  useEffect(() => {
    if (authStore.user) {
      console.log({user: authStore.user})
      financialsStore.initialData();
    }
  }, [authStore.loading]);

  return (
    <Routes >
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route index element={
        <RootLayout>
          <AuthGuard>
            <HomePage />
          </AuthGuard>
        </RootLayout>
      } />
      <Route path="favorite" element={
        <RootLayout>
          <AuthGuard>
            <FavoriteStocksPage />
          </AuthGuard>
        </RootLayout>
      } />
      <Route path="details/:symbol" element={
        <RootLayout>
          <AuthGuard>
            <StockDetails />
          </AuthGuard>
        </RootLayout>
      } />
    </Routes>
  );
}

export default App;
