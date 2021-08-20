import React, { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import ConfirmModal from '../Modals/ConfirmModal';
import './ImageTile.css';

const DELETE_BLOG_ENDPOINT = process.env.REACT_APP_ENDPOINT_IMAGE_DELETE;

const cookies = new Cookies();
const axios = require('axios').default;

interface IProps {
  item: string;
}

const ImageTile: React.FC<IProps> = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const [imageDeleted, setImageDeleted] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [showModal, setshowModal] = useState(false);

  const handleDeleteImage = () => {
    setLoading(true);
    setButtonState(true);
    axios
      .post(
        DELETE_BLOG_ENDPOINT,
        {
          id: item,
        },
        {
          headers: { Authorization: `Bearer ${cookies.get('token')}` },
        }
      )
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
