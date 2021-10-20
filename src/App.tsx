import { useAppDispatch } from 'app/hooks';
import NotFoundPage from 'components/NotFound';
import { getUserInfo } from 'features/user/userSlice';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from 'routeConfig';

function App() {
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(getUserInfo());
      // eslint-disable-next-line
   }, []);
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
