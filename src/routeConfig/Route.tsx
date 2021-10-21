import CircleLoading from 'components/Loading/CircleLoading';
import { useCurrentUser } from 'hooks/useCurrentUser';
import React from 'react';
import {
   Redirect,
   Route as BaseRoute,
   RouteComponentProps,
   RouteProps,
} from 'react-router-dom';
import { Role } from '../utils/types';

interface Props extends RouteProps {
   roles?: Role[];
   withAuth?: boolean;
   redirectIfLogged?: string;
   layout?: React.ComponentType<any>;
}

const Route = ({
   roles,
   withAuth,
   layout: Layout,
   component: Component,
   redirectIfLogged,
   ...routeProps
}: Props) => {
   const { user: currentUser, loading } = useCurrentUser();

   if (!Component) {
      return null;
   }
   if (loading) {
      return <CircleLoading />;
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
   if (redirectIfLogged && currentUser) {
      return <Redirect to="/" />;
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
