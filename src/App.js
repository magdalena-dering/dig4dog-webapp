import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import * as routes from './routes';

import DashboardPage from './pages/dashboard';


const App = () => {
  return (
    <Router history={null}>
      <div className="background" style={{position: 'relative'}}>
        <Route exact path={routes.DASHBOARD} component={DashboardPage}/>
      </div>
    </Router>
  )
};

export default App;
