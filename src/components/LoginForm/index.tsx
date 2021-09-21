import { USERS } from 'fakeData/users';
import React from 'react';
import './LoginForm.scss';
import { useLoginForm } from './useLoginForm';

function LoginForm() {
   // handle login
   const handleLogin = () => {
      const { username, password } = values;
      const user = USERS.find((user) => {
         if (user.username === username && user.password === password)
            return true;
         return false;
      });

      if (!user) {
         alert('Login information is incorrect!');
      } else {
         window.localStorage.setItem('user', JSON.stringify(user));
         alert('Logged in successfully');
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
               <label htmlFor="username">Username</label>
               <input
                  type="text"
                  placeholder="Username"
                  onChange={handleChange}
                  value={values.username || ''}
                  name="username"
               />
               <div className="login__err">{errors.username}</div>
            </div>
            <div className="login__item">
               <label htmlFor="password">Password</label>
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
            <button type="submit">Log In</button>
         </form>
      </div>
   );
}

export default LoginForm;
