import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import NavMenu from '../NavMenu/NavMenu';
import './Blogs.css';

const axios = require('axios').default;

// const GET_BLOGS_ENDPOINT = 'https://blogapi.huxdev.com/api/Blog/GetAllBlogs';
const GET_BLOGS_ENDPOINT = 'https://localhost:44358/api/Blog/GetAllBlogs';

type BlogResponseItem = {
  id: number;
  title: string;
  content: string;
  requests: string;
  dateCreated: string;
  dateModified: string;
};

const Blogs = () => {
  const [responseData, setResponseData] = useState<BlogResponseItem[]>();

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

      {responseData?.map((item) => (
        <div
          key={item.id.toString()}
          className="blogsParent"
          style={{ marginBottom: '3em' }}
        >
          <h3>{item.title}</h3>
          <span>{item.dateCreated.split(' ')[0]}</span>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
