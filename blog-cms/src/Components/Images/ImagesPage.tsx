import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { Button } from '@material-ui/core';
import NavMenu from '../NavMenu/NavMenu';
import './ImagesPage.css';

const axios = require('axios').default;

const GET_IMAGES_ENDPOINT = process.env.REACT_APP_ENDPOINT_IMAGES_GET_ALL;

type ImageResponseItem = {
  file: string;
};

const ImagesPage = () => {
  const [responseData, setResponseData] = useState<[string]>();

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

  return (
    <div className="page-parent">
      <div className="page-sub-parent">
        <NavMenu />
        <h1>Images</h1>
        <div className="images-page-item-container">
          {responseData?.map((item) => (
            <div key={item}>
              <img
                // eslint-disable-next-line prefer-template
                src={'https://blogapi.huxdev.com/Images/' + item.toString()}
                alt={item.toString()}
                width="200px"
                height="200px"
                style={{ border: 'solid' }}
              />
              <Button
                variant="contained"
                size="large"
                color="secondary"
                style={{ marginTop: '55px', marginLeft: '-150px' }}
                //   onClick={deleteButton}
                //   disabled={buttonState}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagesPage;
