import NotFoundPage from 'components/NotFound';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from 'routeConfig';

function App() {
   return (
      <div className="App">
         <Router>
            <Switch>
               {routes}
               <Route>
                  <NotFoundPage />
               </Route>
            </Switch>
         </Router>
      </div>
   );
}

export default App;
