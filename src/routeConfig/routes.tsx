import { Dashboard, LoginPage, UserPage } from 'pages';
import React from 'react';

interface Router {
   path: string;
   exact?: boolean;
   isProtect: boolean;
   component: React.ComponentType<any>;
   withLayout: boolean;
}
export const routes: Router[] = [
   {
      path: '/user',
      exact: true,
      isProtect: true,
      component: () => <UserPage />,
      withLayout: true,
   },
   {
      path: '/login',
      isProtect: false,
      exact: true,
      component: () => <LoginPage />,
      withLayout: false,
   },
   {
      path: '/',
      exact: true,
      isProtect: true,
      component: () => <Dashboard />,
      withLayout: true,
   },
];
