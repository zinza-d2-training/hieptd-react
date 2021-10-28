import NotFoundPage from 'components/NotFound';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from 'routeConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
   return (
      <div className="App">
         <Router>
            <ToastContainer autoClose={4000} hideProgressBar />
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
