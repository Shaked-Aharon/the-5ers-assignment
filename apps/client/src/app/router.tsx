import { Link, createBrowserRouter } from "react-router-dom"
import AuthGuard from "../guards/auth.guard";
import HomePage from "./pages/home.page";
import RootLayout from "./_layout";
import FavoriteStocksPage from "./pages/favorite-stocks.page";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page";
import { StockDetails } from "./pages/stock-details.page";

const router = createBrowserRouter([
  {
    index: true,
    element: <RootLayout><AuthGuard element={<HomePage />} /></RootLayout>,
  },
  {
    path: "/favorite",
    element: <RootLayout><AuthGuard element={<FavoriteStocksPage />} /></RootLayout>,
  },
  {
    path: "/details/:symbol",
    element: <RootLayout><AuthGuard element={<StockDetails />} /></RootLayout>,
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
]);

export default router;