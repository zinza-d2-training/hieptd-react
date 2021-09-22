import { Dashboard, LoginPage } from 'pages';
import React from 'react';

interface Router {
   path: string;

   exact: boolean;
   isProtect: boolean;
   component: React.ComponentType<any>;
   withLayout: boolean;
}
export const routes: Router[] = [
   {
      path: '/',
      exact: true,
      isProtect: true,
      component: () => <Dashboard />,
      withLayout: true,
   },
   {
      path: '/login',
      exact: true,
      isProtect: false,
      component: () => <LoginPage />,
      withLayout: false,
   },
];
