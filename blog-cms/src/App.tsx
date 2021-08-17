import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import NewBlog from './Components/NewBlog/NewBlog';
import Blogs from './Components/Blogs/Blogs';
import BlogEdit from './Components/BlogEdit/BlogEdit';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ErrorPage from './Components/Errors/ErrorPage';
import { Store } from './Store';
import './Global.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  return (
    <Router>
      <div>
        <Store.Provider
          value={{ isLoggedIn, setIsLoggedIn, userName, setUserName }}
        >
          <Route path="/" exact component={Login} />
          <Switch>
            <PrivateRoute path="/app/newblog" exact component={NewBlog} />
            <PrivateRoute path="/app/blogs" exact component={Blogs} />
            <PrivateRoute path="/app/editblog/:id" component={BlogEdit} />
            <PrivateRoute path="/app/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/app/errors" exact component={ErrorPage} />
          </Switch>
        </Store.Provider>
      </div>
    </Router>
  );
}
