import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import './ImageTile.css';

interface IProps {
  item: string;
  showModal: (show: boolean) => void;
  deleteId: (show: string) => void;
  loading: boolean;
  imageDeleted: boolean;
  buttonState: boolean;
}

const ImageTile: React.FC<IProps> = ({
  item,
  showModal,
  deleteId,
  loading,
  imageDeleted,
  buttonState,
}) => (
  <>
    <img
      src={
        // eslint-disable-next-line prefer-template
        'https://blogapi.huxdev.com/Images/' + item
      }
      alt={item}
      width="200px"
      height="200px"
      style={{ border: 'solid' }}
      className={imageDeleted ? 'image-deleted' : ''}
    />
    <Button
      variant="contained"
      size="large"
      color="secondary"
      style={{ marginTop: '55px', marginLeft: '-150px' }}
      onClick={() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        showModal(true);
        deleteId(item);
      }}
      disabled={buttonState}
    >
      Delete
    </Button>
    <div className="loadingSpinner">{loading ? <CircularProgress /> : ''}</div>
  </>
);

export default ImageTile;
