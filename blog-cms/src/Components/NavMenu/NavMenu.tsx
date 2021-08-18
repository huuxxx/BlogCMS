import React, { useState } from 'react';
import { Link as Route, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import { Visible } from 'react-grid-system';
import { useGlobalContext } from '../../Store';
import MenuModal from '../Modals/MenuModal';
import './NavMenu.css';

const cookies = new Cookies();

const NavMenu = () => {
  const { userName } = useGlobalContext();
  const { setIsLoggedIn } = useGlobalContext();
  const [showModal, setshowModal] = useState(false);

  const logOut = () => {
    setIsLoggedIn(false);
    cookies.remove('token');
    <Redirect to="/" />;
  };

  const menuButton = () => {
    setshowModal((currentVal) => !currentVal);
  };

  return (
    <>
      <Visible xxl xl lg md>
        <div className="sidenav">
          <div className="sidenav-contents">
            <span className="userName">User - {userName}</span>
            <nav>
              <ul>
                <li>
                  <Route to="/app/dashboard">Home</Route>
                </li>
                <li>
                  <Route to="/app/blogs">Blogs</Route>
                </li>
                <li>
                  <Route to="/app/errors">Errors</Route>
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
      </Visible>
      <Visible sm xs>
        <MenuModal show={showModal} setShow={setshowModal} />
        <div className="menu-button">
          <Button
            variant="contained"
            size="small"
            color="inherit"
            onClick={menuButton}
          >
            Menu
          </Button>
        </div>
      </Visible>
    </>
  );
};

export default NavMenu;
