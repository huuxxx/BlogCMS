import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import NavMenu from '../NavMenu/NavMenu';

const axios = require('axios').default;

const GET_BLOGS_ENDPOINT = 'http://www.hux-dev/api/BlogItems/GetBlogLatest';

type BlogResponseItem = {
  id: number;
  title: string;
  content: string;
  requests: string;
  datecreated: Date;
  dateModified: Date;
};

const Blogs = () => {
  const [responseData, setResponseData] = useState<BlogResponseItem>();

  useEffect(() => {
    axios
      .get(GET_BLOGS_ENDPOINT)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setResponseData(response.data);
        }
      })
      .catch((error: string) => {});
  }, []);

  return (
    <div>
      <NavMenu />
      Blogs page
      <div>{responseData?.title}</div>
      <div>{responseData?.content}</div>
    </div>
  );
};

export default Blogs;
