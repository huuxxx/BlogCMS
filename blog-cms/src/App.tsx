import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import NewBlog from './Components/NewBlog/NewBlog';
import Blogs from './Components/Blogs/Blogs';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { Store } from './Store';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <Router>
      <div>
        <Store.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <Route path="/" exact component={Login} />
          <Switch>
            <PrivateRoute path="/app/newblog" exact component={NewBlog} />
            <PrivateRoute path="/app/blogs" exact component={Blogs} />
            <PrivateRoute path="/app/dashboard" exact component={Dashboard} />
          </Switch>
        </Store.Provider>
      </div>
    </Router>
  );
}
