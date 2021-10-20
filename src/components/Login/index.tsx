import userApi from 'api/userApi';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Login.scss';
import { useLoginForm } from './useLoginForm';

function Login() {
   const history = useHistory();

   // handle login
   const handleLogin = async () => {
      const { username, password } = values;
      const response = await userApi.postLogin(username, password);
      if (response) {
         window.localStorage.setItem(
            'accessToken',
            JSON.stringify(Object.values(response['accessToken'])[0])
         );

         history.push('/');
         resetForm();
      }
   };

   const { values, errors, handleChange, handleSubmit, resetForm } =
      useLoginForm(handleLogin);

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
