import { LoginPage } from 'pages';
import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { getUser } from 'utils/auth';
import { Role } from 'utils/types';
import { routes } from './routes';
interface Props extends RouteProps {
   roles?: Role[];
   layout: React.ComponentType<any>;
}

function RouterConfig({ layout: Layout }: Props) {
   const currentUser = getUser();

   const login: React.ComponentType<any> = () => <LoginPage />;
   return routes.map((route, index) => {
      const { path, exact, component, isProtect, withLayout, roles } = route;

      const componentRender = !isProtect
         ? component
         : currentUser && currentUser?.email
         ? component
         : login;

      if (
         currentUser &&
         roles.length &&
         roles.includes(currentUser.role as Role)
      ) {
         if (withLayout) {
            return (
               <Layout>
                  <Route
                     key={index}
                     path={path}
                     exact={exact}
                     component={componentRender}
                  />
               </Layout>
            );
         }
         return (
            <Route
               key={index}
               path={path}
               exact={exact}
               component={componentRender}
            />
         );
      } else
         return (
            <Route
               key={index}
               path={path}
               exact={exact}
               component={componentRender}
            />
         );
   });
}

export default RouterConfig;
