import React from 'react';
import Login from 'components/Login';
import Dashboard from 'components/Dashboard';
import Admin from 'layout/Admin';
import Users from 'components/Users';
import UserForm from 'components/UserForm';
import Route from './Route';
import { Role } from 'utils/types';
import { useParams } from 'react-router';
import NotFoundPage from 'components/NotFound';
import UserProfile from 'components/UserProfile';
import UserEditInfo from 'components/UserProfile/UserEditInfo';

const routes = [
   <Route key="login" exact path="/login" component={Login} />,
   <Route
      withAuth
      layout={Admin}
      roles={[Role.Admin]}
      path={`/users/create`}
      component={() => <UserForm />}
      exact
      key="Userform"
   />,
   <Route
      withAuth
      layout={Admin}
      roles={[Role.Admin]}
      path={`/users/:id/update`}
      component={() => {
         const params = useParams();
         if (params['id'] && Number(params['id'])) {
            const id = Number(params['id']);
            return <UserForm id={id} />;
         } else {
            return <NotFoundPage />;
         }
      }}
      key="Userform"
   />,
   <Route
      withAuth
      layout={Admin}
      roles={[Role.Member, Role.PM]}
      path={`/users/:id/edit`}
      component={() => {
         const params = useParams();
         if (params['id'] && Number(params['id'])) {
            const id = Number(params['id']);
            return <UserEditInfo id={id} />;
         } else {
            return <NotFoundPage />;
         }
      }}
      key="Userform"
   />,
   <Route
      key="userprofile"
      path="/users/:id/details"
      exact
      withAuth
      layout={Admin}
      roles={[Role.Admin, Role.Member, Role.PM]}
      component={() => {
         const params = useParams();
         if (params['id'] && Number(params['id'])) {
            const id = Number(params['id']);
            return <UserProfile paramsId={id} />;
         } else {
            return <NotFoundPage />;
         }
      }}
   />,
   <Route
      key="users"
      path="/users"
      exact
      withAuth
      component={Users}
      layout={Admin}
      roles={[Role.Admin]}
   />,
   <Route
      key="dashboard"
      exact
      path="/"
      withAuth
      component={Dashboard}
      layout={Admin}
      roles={[Role.Admin, Role.PM, Role.Member]}
   />,
];

export default routes;
