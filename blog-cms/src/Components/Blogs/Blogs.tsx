import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import NavMenu from '../NavMenu/NavMenu';
import './Blogs.css';

const axios = require('axios').default;

const GET_BLOGS_ENDPOINT = process.env.REACT_APP_ENDPOINT_BLOG_GET_ALL;

type BlogResponseItem = {
  id: number;
  title: string;
  dateCreated: string;
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
    <div className="blogsParent">
      <NavMenu />
      <h1>Blogs</h1>
      {responseData?.map((item) => (
        <div
          key={item.id.toString()}
          className="blogsContainer"
          style={{ marginBottom: '3em' }}
        >
          <Link to={`editblog/${item.id}`}>
            <h3>{item.title}</h3>
          </Link>
          <span>{item.dateCreated.split(' ')[0]}</span>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
