import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import NavMenu from '../NavMenu/NavMenu';
import './Blogs.css';
import { formatDateDetailed } from '../../Helpers/StringHelpers';
import { TablePagination } from '@material-ui/core';

const axios = require('axios').default;

const BLOGS_ENDPOINT = process.env.REACT_APP_ENDPOINT_BLOG;

type BlogResponseItem = {
  id: number;
  title: string;
  dateCreated: string;
};

const Blogs = () => {
  const [responseData, setResponseData] = useState<BlogResponseItem[]>();
  const history = useHistory();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

const getBlogs = () => {
    axios
      .get(BLOGS_ENDPOINT, {
        params: {
            page: page,
            pageSize: pageSize,
          },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setResponseData(response.data.blogs);
          setCount(response.data.count);
          setLoading(false);
        }
      })
      .catch((error: string) => {});
}

  useEffect(() => {
    getBlogs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="page-parent">
      <div className="page-sub-parent blogs-parent">
        <NavMenu />
        <h1>Blogs</h1>
        <Button
          variant="contained"
          size="small"
          color="inherit"
          onClick={() => history.push('/newblog')}
          style={{ marginTop: '25px' }}
        >
          + Create Blog
        </Button>
        {responseData?.map((item) => (
          <div
            key={item.id.toString()}
            className="blogs-container"
            style={{ marginBottom: '1em' }}
          >
            <Link to={`editblog/${item.id}`}>
              <h3>{item.title}</h3>
            </Link>
            <span>{formatDateDetailed(item.dateCreated)}</span>
          </div>
        ))}
        {!loading &&
            <TablePagination
                component="div"
                count={count}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={pageSize}
                rowsPerPageOptions={[ 10 ]}
            />
        }
      </div>
    </div>
  );
};

export default Blogs;
