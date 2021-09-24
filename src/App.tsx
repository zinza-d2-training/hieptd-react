import Admin from 'layout/Admin';
import { NotFoundPage } from 'pages';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RouterConfig from 'routeConfig';

function App() {
   return (
      <div className="App">
         <Router>
            <Switch>
               {RouterConfig({ layout: Admin })}
               <Route>
                  <NotFoundPage />
               </Route>
            </Switch>
         </Router>
      </div>
   );
}

export default App;
