import React from 'react';
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import withPageTitle from "./components/PageTitle";

interface RouteType {
  path: string;
  title: string;
  component: any;
}

const routes: RouteType[] = [
  {
    path: '/',
    title: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    title: 'Dashboard',
    component: Dashboard,
  },
];

const wrappedRoutes = () => {
  return routes.map((route) => {
    const title = route.title ? `${route.title} • Elrond Dapp` : 'Elrond Dapp';
    return {
      path: route.path,
      component: (withPageTitle(title, route.component) as any) as React.ComponentClass<{}, any>,
    };
  });
};

export default wrappedRoutes();
