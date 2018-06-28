import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import * as routes from '../shared/routes';

import LandingPage from '../pages/landing';
import DashboardPage from '../pages/dashboard';
import UserPage from '../pages/user';
import MapPage from '../pages/map';

import Navigation from './Navigation';


const App = () => {
  return (
    <Router history={null}>
      <div className="background" style={{position: 'relative'}}>
        <Navigation/>
        <Route exact path={routes.LANDING} component={LandingPage}/>
        <Route exact path={routes.DASHBOARD} component={DashboardPage}/>
        <Route exact path={routes.USER + ':id'} component={(props) => <UserPage {...props}/>}/>
        <Route exact path={routes.MAP} component={MapPage}/>
      </div>
    </Router>
  )
};

export default App;
