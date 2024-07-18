import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import ImageTile from './ImageTile';
import NavMenu from '../NavMenu/NavMenu';
import './ImagesPage.css';

const axios = require('axios').default;

const IMAGES_ENDPOINT = process.env.REACT_APP_ENDPOINT_IMAGES;

const ImagesPage = () => {
  const [responseData, setResponseData] = useState<[string]>();

  useEffect(() => {
    axios
      .get(IMAGES_ENDPOINT)
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
              <ImageTile item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagesPage;
