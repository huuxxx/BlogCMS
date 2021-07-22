import React from 'react';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';

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

Modal.setAppElement('#root');

interface IProps {
  confirmButton: () => void;
  show: boolean;
  setShow: (state: boolean) => void;
}

const ConfirmModal: React.FC<IProps> = ({ confirmButton, show, setShow }) => (
  <div className="customStyles">
    <Modal isOpen={show} style={customStyles} contentLabel="Example Modal">
      <div>Delete Blog?</div>
      <Button
        onClick={() => {
          confirmButton();
          setShow(false);
        }}
      >
        Yes
      </Button>
      <Button
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
