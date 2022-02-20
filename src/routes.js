import { Admin } from "./components/admin"
import { Auth } from "./components/auth"
import { ShopPage } from "./components/shops/shopPage"
import { Shops } from "./components/shops"
import { ForgotPass } from "./components/auth/forgotPass"

export const privateRoutes = [
  { path: "*", element: <Shops />, exact: false },
  { path: "/shop/:id", element: <ShopPage />, exact: true },
  { path: "/profile", element: <Admin />, exact: true }
]

export const publicRoutes = [
  { path: "*", element: <Auth />, exact: true },
  { path: "/forgotPass", element: <ForgotPass />, exact: true }
]