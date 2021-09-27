import React from 'react';
import Login from 'components/Login';
import Dashboard from 'components/Dashboard';
import Admin from 'layout/Admin';
import Users from 'components/Users';
import UserForm from 'components/UserForm';
import Route from './Route';
import { Role } from 'utils/types';

const routes = [
   <Route key="login" exact path="/login" component={Login} />,
   <Route
      withAuth
      layout={Admin}
      roles={[Role.Admin]}
      path={`/users/create`}
      component={() => <UserForm isCreate={true} />}
      exact
      key="Userform"
   />,
   <Route
      withAuth
      layout={Admin}
      roles={[Role.Admin]}
      path={`/users/update/:id`}
      component={() => <UserForm isCreate={false} />}
      key="Userform"
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
