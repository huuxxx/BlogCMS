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

  const viewData = () => {
    console.log(responseData ? [0] : '');
  };

  useEffect(() => {
    axios
      .get(GET_IMAGES_ENDPOINT)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setResponseData(response.data);
          viewData();
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
        {/* {responseData?.map((item) => (
          <div key={item.file.toString()} style={{ marginBottom: '3em' }} />
        ))} */}
      </div>
    </div>
  );
};

export default ImagesPage;
