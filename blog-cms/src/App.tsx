import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import NewBlog from './Components/NewBlog/NewBlog';
import Blogs from './Components/Blogs/Blogs';
import BlogEdit from './Components/BlogEdit/BlogEdit';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ErrorPage from './Components/Errors/ErrorPage';
import ImagesPage from './Components/Images/ImagesPage';
import { Store } from './Store';
import './Global.css';
import './App.css';

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
            <PrivateRoute path="/newblog" exact component={NewBlog} />
            <PrivateRoute path="/blogs" exact component={Blogs} />
            <PrivateRoute path="/editblog/:id" component={BlogEdit} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/errors" exact component={ErrorPage} />
            <PrivateRoute path="/images" exact component={ImagesPage} />
          </Switch>
        </Store.Provider>
      </div>
    </Router>
  );
}
