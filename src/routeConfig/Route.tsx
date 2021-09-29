import React from 'react';
import { Role } from '../utils/types';
import { getUser } from '../utils/auth';
import {
   Redirect,
   Route as BaseRoute,
   RouteComponentProps,
   RouteProps,
} from 'react-router-dom';

interface Props extends RouteProps {
   roles?: Role[];
   withAuth?: boolean;
   layout?: React.ComponentType<any>;
}

const Route = ({
   roles,
   withAuth,
   layout: Layout,
   component: Component,
   ...routeProps
}: Props) => {
   const currentUser = getUser();
   console.log(currentUser);
   if (!Component) {
      return null;
   }
   if (withAuth) {
      return (
         <BaseRoute
            {...routeProps}
            render={(props: RouteComponentProps) => {
               if (!currentUser?.email) {
                  return <Redirect to="/login" />;
               }
               if (
                  currentUser &&
                  !(roles?.length && roles.includes(currentUser.role as Role))
               ) {
                  return <Redirect to="/" />;
               }

               if (Layout) {
                  return (
                     <Layout>
                        <Component {...props} />
                     </Layout>
                  );
               }
               return <Component {...props} />;
            }}
         />
      );
   }
   return (
      <BaseRoute
         {...routeProps}
         render={(props: RouteComponentProps) => {
            if (Layout) {
               return (
                  <Layout>
                     <Component {...props} />
                  </Layout>
               );
            }
            return <Component {...props} />;
         }}
      />
   );
};
export default Route;
