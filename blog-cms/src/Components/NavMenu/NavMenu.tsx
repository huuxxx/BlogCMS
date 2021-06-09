import React from 'react';
import { Link as Route, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useGlobalContext } from '../../Store';

const NavMenu = () => {
  const { userName } = useGlobalContext();
  const { setIsLoggedIn } = useGlobalContext();

  const logOut = () => {
    setIsLoggedIn(false);
    <Redirect to="/" />;
  };

  return (
    <div style={{ marginLeft: '1em', marginTop: '1em' }}>
      <span>User: {userName}</span>
      <nav>
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
        color="secondary"
        className="loginBtn"
        onClick={logOut}
      >
        Log Out
      </Button>
    </div>
  );
};

export default NavMenu;
