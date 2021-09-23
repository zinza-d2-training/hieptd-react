import { Dashboard, LoginPage, UserPage } from 'pages';
import React from 'react';
import { Role } from 'utils/types';

interface Router {
   path: string;
   exact?: boolean;
   isProtect: boolean;
   component: React.ComponentType<any>;
   withLayout: boolean;
   roles: Role[];
}
export const routes: Router[] = [
   {
      path: '/login',
      isProtect: false,
      exact: true,
      component: () => <LoginPage />,
      withLayout: false,
      roles: [Role.Admin, Role.PM, Role.Member],
   },
   {
      path: '/user',
      exact: true,
      isProtect: true,
      component: () => <UserPage />,
      withLayout: true,
      roles: [Role.Admin],
   },

   {
      path: '/',
      exact: true,
      isProtect: true,
      component: () => <Dashboard />,
      withLayout: true,
      roles: [Role.Admin, Role.PM, Role.Member],
   },
];
