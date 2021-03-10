import React from 'react';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Landing from './pages/Landing';
import withPageTitle from './components/PageTitle';
import Owner from 'pages/Owner';

interface RouteType {
  path: string;
  page: string;
  title: string;
  component: any;
}

const routes: RouteType[] = [
  {
    path: '/',
    page: 'landing',
    title: 'Landing',
    component: Landing,
  },
  {
    path: '/login',
    page: 'home',
    title: 'Login',
    component: Home,
  },
  {
    path: '/dashboard',
    page: 'dashboard',
    title: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/owner',
    page: 'owner',
    title: 'Owner',
    component: Owner,
  },
];

const wrappedRoutes = () => {
  return routes.map(route => {
    const title = route.title ? `${route.title} • Delegation Manager` : 'Delegation Manager';
    return {
      path: route.path,
      page: route.page,
      component: (withPageTitle(title, route.component) as any) as React.ComponentClass<{}, any>,
    };
  });
};

export default wrappedRoutes();
