import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import NewBlog from './Components/NewBlog/NewBlog';
import Blogs from './Components/Blogs/Blogs';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/newblog" component={NewBlog} />
          <Route path="/blogs" component={Blogs} />
          <Route path="/dashboard" component={Dashboard} />;
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}
