import React from 'react';
import './styles/Login.scss';

function LoginPage() {
   return (
      <div className="login">
         <form>
            <h1>Login to Dashboard</h1>
            <div className="login__item">
               <label htmlFor="user">Username</label>
               <input id="user" type="text" placeholder="Username" />
               <div className="login__err">Error nef</div>
            </div>
            <div className="login__item">
               <label htmlFor="pass">Password</label>
               <input id="username" type="password" placeholder="Password" />
               <div className="login__err">Error nef</div>
            </div>
            <button type="submit">Log In</button>
         </form>
      </div>
   );
}

export default LoginPage;
