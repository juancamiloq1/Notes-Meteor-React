import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import Login from './../ui/Login';
import NotFound from './../ui/NotFound';

const browserHistory = createHistory();
window.browserHistory = browserHistory;

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

export const onAuthChange = (isAuthenticated) => {
    const pathName = browserHistory.location.pathname;
    const isUnauthenticatedPages = unauthenticatedPages.includes(pathName);
    const isAuthenticatedPages = authenticatedPages.includes(pathName);
    console.log('Is Authenticated', isAuthenticated);
  
    if( isUnauthenticatedPages && isAuthenticated ) {
      //redirect to links
      browserHistory.replace('/dashboard');
    } else if ( isAuthenticatedPages && !isAuthenticated ) {
      // redirect to /
      browserHistory.replace('/');
    }
};

export const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="*" component={NotFound}/>
    </Switch>
  </Router>
);