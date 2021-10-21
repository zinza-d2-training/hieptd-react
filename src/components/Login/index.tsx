import CircleLoading from 'components/Loading/CircleLoading';
import { useApi } from 'hooks/useApi';
import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { getUser, setToken } from 'utils/auth';
import './Login.scss';
import { useLoginForm } from './useLoginForm';

function Login() {
   const history = useHistory();
   const currentUser = getUser();
   const { response, error, loading, callApi } = useApi({
      url: '/auth/login',
      body: {},
      method: 'post',
   });

   // handle login
   const handleLogin = async () => {
      const { username, password } = values;
      await callApi({ username, password });
      resetForm();
   };

   const { values, errors, handleChange, handleSubmit, resetForm } =
      useLoginForm(handleLogin);

   useEffect(() => {
      if (Object.keys(response).length !== 0) {
         setToken(response['accessToken']);
         window.location.reload();
      }
      if (currentUser) {
         history.push('/');
      }
   }, [currentUser, response, history]);

   if (error) {
      return (
         <Redirect
            push
            to={{
               pathname: '/error',
               state: { error: error },
            }}
         />
      );
   }

   if (loading) {
      return <CircleLoading />;
   }

   return (
      <div className="loginForm">
         <form onSubmit={handleSubmit}>
            <h1>Login to Dashboard</h1>
            <div className="login__item">
               <div className="login__item-input">
                  <label>Username</label>
                  <input
                     type="text"
                     placeholder="Username"
                     onChange={handleChange}
                     value={values.username || ''}
                     name="username"
                  />
                  <div className="login__err">{errors.username}</div>
               </div>
            </div>
            <div className="login__item">
               <div className="login__item-input">
                  <label>Password</label>
                  <input
                     id="password"
                     type="password"
                     placeholder="Password"
                     onChange={handleChange}
                     value={values.password || ''}
                     name="password"
                  />
                  <div className="login__err">{errors.password}</div>
               </div>
            </div>
            <button type="submit">Log In</button>
         </form>
      </div>
   );
}

export default Login;
