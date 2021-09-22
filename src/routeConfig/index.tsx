import { LoginPage } from 'pages';
import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { Role } from 'utils/types';
import { routes } from './routes';
interface Props extends RouteProps {
   roles?: Role[];
   isProtect?: boolean;
   layout: React.ComponentType<any>;
   isAuth: boolean;
}

function RouterConfig({ isAuth, layout: Layout }: Props) {
   const login: React.ComponentType<any> = () => <LoginPage />;
   return routes.map((route, index) => {
      const { path, exact, component, isProtect, withLayout } = route;
      const componentRender = !isProtect
         ? component
         : isAuth
         ? component
         : login;
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
   });
}

export default RouterConfig;
