import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import ConfirmModal from '../Modals/ConfirmModal';
import './ImageTile.css';
import { Button, CircularProgress } from '@mui/material';

const IMAGE_ENDPOINT = process.env.REACT_APP_ENDPOINT_IMAGE;
const API_IMAGE_URL = process.env.REACT_APP_API_IMAGES_URL;

const cookies = new Cookies();
const axios = require('axios').default;

interface Props {
  imageId: string;
}

const ImageTile: React.FC<Props> = ({ imageId }) => {
  const [loading, setLoading] = useState(false);
  const [imageDeleted, setImageDeleted] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [showModal, setshowModal] = useState(false);

  const handleDeleteImage = () => {
    setLoading(true);
    setButtonState(true);
    axios
      .delete(`${IMAGE_ENDPOINT}/${imageId}`, {
        headers: { Authorization: `Bearer ${cookies.get('token')}` },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setLoading(false);
          setImageDeleted(true);
        }
      })
      .catch((error: string) => {
        setLoading(false);
        setButtonState(false);
      });
  };

  return (
    <>
      <ConfirmModal
        confirmButton={handleDeleteImage}
        show={showModal}
        setShow={setshowModal}
        message="Delete Image?"
      />
      <img
        src={
          // eslint-disable-next-line prefer-template
          `${API_IMAGE_URL}/${imageId}`
        }
        alt={imageId}
        width="200px"
        height="200px"
        style={{ border: 'solid' }}
        className={imageDeleted ? 'image-deleted' : ''}
      />
      <Button
        variant="contained"
        size="large"
        color="error"
        style={{ marginTop: '55px', marginLeft: '-150px' }}
        onClick={() => setshowModal(true)}
        disabled={buttonState}
      >
        Delete
      </Button>
      <div className="loadingSpinner">
        {loading ? <CircularProgress /> : ''}
      </div>
    </>
  );
};

export default ImageTile;
