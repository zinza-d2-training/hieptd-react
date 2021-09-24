import Login from 'components/Login';
import Permission from 'components/Permission';
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
   if (currentUser && currentUser.email) {
      return routes.map((route, index) => {
         const { path, exact, component, roles, withLayout } = route;

         if (roles && roles.includes(currentUser.role)) {
            if (withLayout) {
               return (
                  <Layout>
                     <Route
                        key={index}
                        path={path}
                        exact={exact}
                        component={component}
                     />
                  </Layout>
               );
            }
            return (
               <Layout>
                  <Route
                     key={index}
                     path={path}
                     exact={exact}
                     component={component}
                  />
               </Layout>
            );
         }
         return (
            <Layout>
               <Route
                  key={index}
                  path={path}
                  exact={exact}
                  component={Permission}
               />
            </Layout>
         );
      });
   }
   return <Route key="login" path="/" component={Login} />;
}

export default RouterConfig;
