import React from 'react';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import { Link as Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useGlobalContext } from '../../Store';
import './ConfirmModal.css';

const cookies = new Cookies();

Modal.setAppElement('#root');

interface IProps {
  show: boolean;
  setShow: (state: boolean) => void;
}

const customStyles = {
  content: {
    top: '20%',
    left: '10%',
    right: 'auto',
    bottom: 'auto',
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
    <div>
      <Modal isOpen={show} style={customStyles} contentLabel="Mini Menu">
        <div className="mininav">
          <Button
            size="large"
            className="close-button"
            onClick={() => {
              setShow(false);
            }}
          >
            X
          </Button>
          <div className="mininav-contents">
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
