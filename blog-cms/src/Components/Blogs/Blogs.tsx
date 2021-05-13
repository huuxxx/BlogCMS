import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import NavMenu from '../NavMenu/NavMenu';

const axios = require('axios').default;

const GET_BLOGS_ENDPOINT =
  'https://localhost:44358/api/BlogItems/GetBlogLatest';

type ResponseData = {
  Id: number;
  Title: string;
  Content: string;
  Requests: string;
  Datecreated: Date;
  DateModified: Date;
};

const Blogs = () => {
  const [responseData, setResponseData] = useState<ResponseData>();

  useEffect(() => {
    axios
      .get(GET_BLOGS_ENDPOINT)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setResponseData(response.data);
          console.log(response.data);
        }
      })
      .catch((error: string) => {});
  }, []);

  return (
    <div>
      <NavMenu />
      Blogs page
      <div>{responseData?.Content}</div>
    </div>
  );
};

export default Blogs;
