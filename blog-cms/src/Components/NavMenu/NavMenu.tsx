import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
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
  const history = useHistory();

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
            <Button
              variant="contained"
              size="small"
              color="inherit"
              onClick={() => history.push('/app/dashboard')}
              style={{ marginTop: '25px', minWidth: '80px' }}
            >
              Home
            </Button>
            <Button
              variant="contained"
              size="small"
              color="inherit"
              onClick={() => history.push('/app/blogs')}
              style={{ marginTop: '5px', minWidth: '80px' }}
            >
              Blogs
            </Button>
            <Button
              variant="contained"
              size="small"
              color="inherit"
              onClick={() => history.push('/app/errors')}
              style={{
                marginTop: '5px',
                marginBottom: '25px',
                minWidth: '80px',
              }}
            >
              Errors
            </Button>
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
