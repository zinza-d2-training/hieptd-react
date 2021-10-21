import NotFoundPage from 'components/NotFound';
import { useApi } from 'hooks/useApi';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from 'routeConfig';
import { getToken, setUser } from 'utils/auth';

function App() {
   const { response, callApi } = useApi({
      url: '/auth/profile',
      body: null,
      method: 'get',
   });
   const token = getToken();

   useEffect(() => {
      if (token) {
         callApi();
      }
      if (response && response['user']) {
         setUser(response['user']);
      }
      // eslint-disable-next-line
   }, [response, token]);
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
