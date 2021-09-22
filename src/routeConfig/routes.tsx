import { Dashboard, LoginPage } from 'pages';
import React from 'react';

interface Router {
   name: string;
   path: string;
   exact: boolean;
   isProtect: boolean;
   component: React.ComponentType<any>;
   isLayout: boolean;
}
export const routes: Router[] = [
   {
      name: 'HomePage',
      path: '/',
      exact: true,
      isProtect: true,
      component: () => <Dashboard />,
      isLayout: true,
   },
   {
      name: 'Login',
      path: '/login',
      exact: true,
      isProtect: false,
      component: () => <LoginPage />,
      isLayout: false,
   },
];
