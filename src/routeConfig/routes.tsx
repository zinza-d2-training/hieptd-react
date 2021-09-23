import { Dashboard, UserPage } from 'pages';
import React from 'react';
import { Role } from 'utils/types';

interface Router {
   path: string;
   exact?: boolean;
   component: React.ComponentType<any>;
   withLayout?: boolean;
   roles?: Role[];
}
export const routes: Router[] = [
   {
      path: '/user',
      component: () => <UserPage />,
      withLayout: true,
      roles: [Role.Admin],
   },
   {
      exact: true,
      path: '/',
      component: () => <Dashboard />,
      withLayout: true,
      roles: [Role.Admin, Role.Member, Role.PM],
   },
];
