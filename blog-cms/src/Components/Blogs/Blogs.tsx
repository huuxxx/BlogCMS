import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import parse from 'html-react-parser';
import { compareAsc, format } from 'date-fns';
import NavMenu from '../NavMenu/NavMenu';
import './Blogs.css';

const axios = require('axios').default;

const GET_BLOGS_ENDPOINT =
  'https://localhost:44358/api/BlogItems/GetBlogLatest';

type BlogResponseItem = {
  id: number;
  title: string;
  content: string;
  requests: string;
  datecreated: string;
  dateModified: string;
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
      <div className="blogsParent">
        <h1>Blogs</h1>
        <h3>{responseData?.title}</h3>
        <div>{responseData?.datecreated}</div>
        <span style={{ marginTop: '1em' }}>{responseData?.dateModified}</span>
        <div style={{ marginTop: '1em' }}>
          {parse(responseData?.content ?? '')}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
