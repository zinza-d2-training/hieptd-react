import CircleLoading from 'components/Loading/CircleLoading';
import React from 'react';
import { Redirect } from 'react-router-dom';
import './Login.scss';
import { useLogin } from './useLogin';
import { useLoginForm } from './useLoginForm';

function Login() {
   const { login, loading, error } = useLogin();
   // handle login
   const handleLogin = async () => {
      const { username, password } = values;
      if (username && password) {
         await login(username, password);
         resetForm();
      }
   };

   const { values, errors, handleChange, handleSubmit, resetForm } =
      useLoginForm(handleLogin);

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
