import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from 'routeConfig';

function App() {
   return (
      <div className="App">
         <Router>
            <Switch>{routes}</Switch>
         </Router>
      </div>
   );
}

export default App;
