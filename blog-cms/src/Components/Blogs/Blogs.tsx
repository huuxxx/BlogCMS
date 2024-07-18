import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import NavMenu from '../NavMenu/NavMenu';
import './Blogs.css';
import { formatDateDetailed } from '../../Helpers/StringHelpers';

const axios = require('axios').default;

const GET_BLOGS_ENDPOINT = process.env.REACT_APP_ENDPOINT_BLOG_GET_ALL;

type BlogResponseItem = {
  id: number;
  title: string;
  dateCreated: string;
};

const Blogs = () => {
  const [responseData, setResponseData] = useState<BlogResponseItem[]>();
  const history = useHistory();

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
    <div className="page-parent">
      <div className="page-sub-parent blogs-parent">
        <NavMenu />
        <h1>Blogs</h1>
        <Button
          variant="contained"
          size="small"
          color="inherit"
          onClick={() => history.push('/app/newblog')}
          style={{ marginTop: '25px' }}
        >
          + Create Blog
        </Button>
        {responseData?.map((item) => (
          <div
            key={item.id.toString()}
            className="blogs-container"
            style={{ marginBottom: '3em' }}
          >
            <Link to={`editblog/${item.id}`}>
              <h3>{item.title}</h3>
            </Link>
            {/* <span>{item.dateCreated.split(' ')[0]}</span> */}
            <span>{formatDateDetailed(item.dateCreated)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
