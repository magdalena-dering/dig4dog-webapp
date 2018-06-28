import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import * as routes from './routes';

import DashboardPage from './pages/dashboard';
import UserPage from './pages/user';


const App = () => {
  return (
    <Router history={null}>
      <div className="background" style={{position: 'relative'}}>
        <Route exact path={routes.DASHBOARD} component={DashboardPage}/>
        <Route exact path={routes.USER + ':id'} component={(props) => <UserPage {...props}/>}/>
      </div>
    </Router>
  )
};

export default App;
