import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={Login} />;
          <Route path="/Dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}
