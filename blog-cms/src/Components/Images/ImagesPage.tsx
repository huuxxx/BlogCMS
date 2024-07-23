import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import ImageTile from './ImageTile';
import NavMenu from '../NavMenu/NavMenu';
import './ImagesPage.css';

const cookies = new Cookies();
const axios = require('axios').default;

const IMAGES_ENDPOINT = process.env.REACT_APP_ENDPOINT_IMAGE;

const ImagesPage = () => {
  const [responseData, setResponseData] = useState<[string]>();

  useEffect(() => {
    axios
      .get(IMAGES_ENDPOINT, {
        headers: { Authorization: `Bearer ${cookies.get('token')}` },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setResponseData(response.data);
        }
      })
      .catch((error: string) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-parent">
      <div className="page-sub-parent">
        <NavMenu />
        <h1>Images</h1>
        <div className="images-page-item-container">
          {responseData?.map((item) => (
            <div key={item}>
              <ImageTile imageId={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagesPage;
