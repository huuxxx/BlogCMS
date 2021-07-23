import React from 'react';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import { Link as Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useGlobalContext } from '../../Store';
import './MenuModal.css';

const cookies = new Cookies();

Modal.setAppElement('#root');

interface IProps {
  show: boolean;
  setShow: (state: boolean) => void;
}

const customStyles = {
  content: {
    top: '160px',
    left: '80px',
    bottom: 'auto',
    width: '110px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const MenuModal: React.FC<IProps> = ({ show, setShow }) => {
  const { userName } = useGlobalContext();
  const { setIsLoggedIn } = useGlobalContext();

  const logOut = () => {
    setIsLoggedIn(false);
    cookies.remove('token');
    <Redirect to="/" />;
  };

  return (
    <div className="mininav">
      <Modal isOpen={show} style={customStyles} contentLabel="Mini Menu">
        <div className="mininav-contents">
          <Button
            size="small"
            className="close-button"
            onClick={() => {
              setShow(false);
            }}
          >
            X
          </Button>
          <div>
            <span>User - {userName}</span>
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
              color="inherit"
              onClick={logOut}
            >
              Log Out
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default MenuModal;
