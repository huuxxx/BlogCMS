/* eslint-disable react/jsx-key */
import { AxiosResponse } from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';

const axios = require('axios').default;

interface IProps {
  numberOfRecords: number;
}

const GET_VISITORS_ENDPOINT = 'https://localhost:44358/api/Blog/EditBlog';
// const GET_VISITORS_ENDPOINT = 'https://blogapi.huxdev.com/api/Blog/EditBlog';

type VisitorItem = {
  Id: number;
  VisitorIp: string;
  ScreenWidth: number;
  ScreenHeight: number;
  DateVisited: string;
  ViewedBlogs: boolean;
  ViewedProjects: boolean;
  ViewedAbout: boolean;
};

// const ShowVisitors: React.FC<IProps> = ({ numberOfRecords }) => {
const ShowVisitors: React.FC = () => {
  //   const [responseData, setResponsedata] = useState<VisitorItem[]>();

  const data = useMemo(
    () => [
      {
        Id: 1,
        VisitorIp: '123.123.123.123',
        ScreenWidth: 1920,
        ScreenHeight: 1080,
        DateVisited: '13/06/2021',
        ViewedBlogs: true,
        ViewedProjects: false,
        ViewedAbout: true,
      },
      {
        Id: 2,
        VisitorIp: '123.123.123.123',
        ScreenWidth: 1920,
        ScreenHeight: 1080,
        DateVisited: '13/06/2021',
        ViewedBlogs: true,
        ViewedProjects: false,
        ViewedAbout: true,
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Visitor IP',
        accesor: 'Id',
      },
      {
        Header: 'Screen Width',
        accesor: 'Id',
      },
      {
        Header: 'Screen Height',
        accesor: 'Id',
      },
      {
        Header: 'Date Visited',
        accesor: 'Id',
      },
      {
        Header: 'Blogs',
        accesor: 'Id',
      },
      {
        Header: 'Projects',
        accesor: 'Id',
      },
      {
        Header: 'About',
        accesor: 'Id',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  //   useEffect(() => {
  //     axios
  //       .post(GET_VISITORS_ENDPOINT, {
  //         records: 0,
  //       })
  //       .then((response: AxiosResponse) => {
  //         if (response.status === 200) {
  //           setResponsedata(response.data);
  //         }
  //       })
  //       .catch((error: string) => {});
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: '10px',
                    border: 'solid 1px gray',
                    background: 'papayawhip',
                  }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ShowVisitors;
