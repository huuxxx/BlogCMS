import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { Button } from '@material-ui/core';
import NavMenu from '../NavMenu/NavMenu';
import './ImagesPage.css';

const axios = require('axios').default;

const GET_IMAGES_ENDPOINT = process.env.REACT_APP_ENDPOINT_IMAGES_GET_ALL;

type BlogResponseItem = {
  id: number;
  title: string;
  dateCreated: string;
};

const ImagesPage = () => {
  const [responseData, setResponseData] = useState<BlogResponseItem[]>();

  //   useEffect(() => {
  //     axios
  //       .get(GET_IMAGES_ENDPOINT)
  //       .then((response: AxiosResponse) => {
  //         if (response.status === 200) {
  //           setResponseData(response.data);
  //         }
  //       })
  //       .catch((error: string) => {});
  //   }, []);

  return (
    <div className="page-parent">
      <div className="page-sub-parent">
        <NavMenu />
        <h1>Images</h1>
        {/* {responseData?.map((item) => (
          <div
            key={item.id.toString()}
            className="blogs-container"
            style={{ marginBottom: '3em' }}
          >
            <span>{item.dateCreated.split(' ')[0]}</span>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default ImagesPage;
