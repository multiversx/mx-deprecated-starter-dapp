import React from 'react';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
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
    page: 'home',
    title: 'Home',
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
    title: 'Owner',
    component: Owner,
  },
];

const wrappedRoutes = () => {
  return routes.map(route => {
    const title = route.title
      ? `${route.title} • Elrond Delegation Dashboard`
      : 'Elrond Delegation Dashboard';
    return {
      path: route.path,
      page: route.page,
      component: (withPageTitle(title, route.component) as any) as React.ComponentClass<{}, any>,
    };
  });
};

export default wrappedRoutes();
