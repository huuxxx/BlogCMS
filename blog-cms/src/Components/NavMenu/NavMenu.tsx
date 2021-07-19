import React from 'react';
import { Link as Route, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import { useGlobalContext } from '../../Store';
import './NavMenu.css';

const cookies = new Cookies();

const NavMenu = () => {
  const { userName } = useGlobalContext();
  const { setIsLoggedIn } = useGlobalContext();

  const logOut = () => {
    setIsLoggedIn(false);
    cookies.remove('token');
    <Redirect to="/" />;
  };

  return (
    <div className="sidenav">
      <div className="sidenav-contents">
        <span className="userName">User - {userName}</span>
        <nav className="sidenav-links">
          <ul>
            <li>
              <Route to="/app/dashboard">Home</Route>
            </li>
            <li>
              <Route to="/app/blogs">Blogs</Route>
            </li>
            <li>
              <Route to="/app/newblog">New Blog</Route>
            </li>
          </ul>
        </nav>

        <Button
          variant="contained"
          size="small"
          color="inherit"
          onClick={logOut}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default NavMenu;
