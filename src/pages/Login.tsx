import { useForm } from 'app/useForm';
import React from 'react';
import './styles/Login.scss';

function LoginPage() {
   // handle login
   const handleLogin = () => {
      alert(JSON.stringify(values));
   };
   const { values, errors, handleChange, handleSubmit } = useForm(handleLogin);

   return (
      <div className="login">
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

export default LoginPage;
