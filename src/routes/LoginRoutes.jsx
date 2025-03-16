import { lazy } from "react";
import PublicRoute from "./PublicRoute"; 
import Loadable from "components/Loadable";
import MinimalLayout from "layout/MinimalLayout";

const AuthLogin = Loadable(lazy(() => import("pages/authentication/login")));

const LoginRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      element: <PublicRoute />, // PublicRoute qo‘shildi
      children: [
        {
          path: "/login",
          element: <AuthLogin />,
        },
      ],
    },
  ],
};

export default LoginRoutes;
