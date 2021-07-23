import React from 'react';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import './ConfirmModal.css';

Modal.setAppElement('#root');

interface IProps {
  confirmButton: () => void;
  show: boolean;
  setShow: (state: boolean) => void;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ConfirmModal: React.FC<IProps> = ({ confirmButton, show, setShow }) => (
  <div>
    <Modal isOpen={show} style={customStyles} contentLabel="Confirm Delete">
      <div className="delete-blog-text">Delete Blog?</div>
      <Button
        size="large"
        className="yes-button"
        onClick={() => {
          confirmButton();
          setShow(false);
        }}
      >
        Yes
      </Button>
      <Button
        size="large"
        className="no-button"
        onClick={() => {
          setShow(false);
        }}
      >
        No
      </Button>
    </Modal>
  </div>
);
export default ConfirmModal;
