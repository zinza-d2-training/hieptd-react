import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RouterConfig from 'routeConfig';
import { NotFoundPage } from 'pages';
import Admin from 'layout/Admin';

function App() {
   return (
      <div className="App">
         <Router>
            <Switch>
               {RouterConfig({ isAuth: false, layout: Admin })}
               <Route>
                  <NotFoundPage />
               </Route>
            </Switch>
         </Router>
      </div>
   );
}

export default App;
