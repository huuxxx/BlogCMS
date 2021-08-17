/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import ErrorTable from './ErrorTable';
import NavMenu from '../NavMenu/NavMenu';
import './ErrorPage.css';

const ErrorPage = () => (
  <div className="dashboard">
    <NavMenu />
    <div className="dashboardParent">
      <h1>Error Log</h1>
      <ErrorTable />
    </div>
  </div>
);

export default ErrorPage;
