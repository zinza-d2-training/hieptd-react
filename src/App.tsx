import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RouterConfig from 'routeConfig';
import { NotFoundPage } from 'pages';
import Admin from 'layout/Admin';
import { getUser } from 'utils/auth';

function App() {
   const [isLogin, setIsLogin] = useState(false);
   useEffect(() => {
      const currentUser = getUser();
      console.log(currentUser);
      if (currentUser) {
         setIsLogin(true);
      }
   }, []);

   return (
      <div className="App">
         <Router>
            <Switch>
               {RouterConfig({ isAuth: isLogin, layout: Admin })}
               <Route>
                  <NotFoundPage />
               </Route>
            </Switch>
         </Router>
      </div>
   );
}

export default App;
