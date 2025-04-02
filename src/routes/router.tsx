import {
  createRouter,
  Outlet,
  createRootRoute,
  Route,
  redirect,
} from "@tanstack/react-router";
import { lazy } from "react";
import { AuthProvider } from "../context/AuthContext";

const Root = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

const rootRoute = createRootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <div>Home! (redirect to /dashboard soon)</div>,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: lazy(() => import("../pages/Login")),
});

const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: lazy(() => import("../pages/Dashboard")),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute,
]);

const router = createRouter({ routeTree });

export default router;
