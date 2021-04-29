import React from 'react';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import withPageTitle from './components/PageTitle';
import Owner from 'pages/Owner';
import Ledger from 'pages/Ledger';
import WalletConnect from 'pages/WalletConnect';

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
    title: '',
    component: Home,
  },
  {
    path: '/dashboard',
    page: 'dashboard',
    title: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/ledger',
    page: 'ledger',
    title: 'Ledger login',
    component: Ledger,
  },
  {
    path: '/walletconnect',
    page: 'walletconnect',
    title: 'Maiar login',
    component: WalletConnect,
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
