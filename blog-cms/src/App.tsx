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
        <Route path="/" exact component={Login} />
        <Switch>
          <Route path="/app/newblog" exact component={NewBlog} />
          <Route path="/app/blogs" exact component={Blogs} />
          <Route path="/app/dashboard" exact component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}
