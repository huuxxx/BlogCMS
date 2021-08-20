import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import ConfirmModal from '../Modals/ConfirmModal';
import ImageTile from './ImageTile';
import NavMenu from '../NavMenu/NavMenu';
import './ImagesPage.css';

const cookies = new Cookies();
const axios = require('axios').default;

const GET_IMAGES_ENDPOINT = process.env.REACT_APP_ENDPOINT_IMAGES_GET_ALL;
const DELETE_BLOG_ENDPOINT = process.env.REACT_APP_ENDPOINT_IMAGE_DELETE;

const ImagesPage = () => {
  const [responseData, setResponseData] = useState<[string]>();
  const [showModal, setshowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageDelte, setImageDeleted] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  useEffect(() => {
    axios
      .get(GET_IMAGES_ENDPOINT)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setResponseData(response.data);
        }
      })
      .catch((error: string) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteImage = () => {
    setLoading(true);
    setButtonState(true);
    axios
      .post(
        DELETE_BLOG_ENDPOINT,
        {
          id: deleteId,
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
    <div className="page-parent">
      <div className="page-sub-parent">
        <NavMenu />
        <ConfirmModal
          confirmButton={handleDeleteImage}
          show={showModal}
          setShow={setshowModal}
          message="Delete Image?"
        />
        <h1>Images</h1>
        <div className="images-page-item-container">
          {responseData?.map((item) => (
            <div key={item}>
              <ImageTile
                item={item}
                showModal={setshowModal}
                deleteId={setDeleteId}
                loading={loading}
                imageDeleted={imageDelte}
                buttonState={buttonState}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagesPage;
