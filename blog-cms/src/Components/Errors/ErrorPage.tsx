/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import { Button, CircularProgress } from '@material-ui/core';
import ErrorTable from './ErrorTable';
import NavMenu from '../NavMenu/NavMenu';
import ConfirmModal from '../Modals/ConfirmModal';
import './ErrorPage.css';

const axios = require('axios').default;

const CLEAR_ERROR_LIST_ENDPOINT = process.env.REACT_APP_ENDPOINT_ERRORS_CLEAR;

const ErrorPage = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [responseState, setResponseState] = useState('');
  const clearButton = () => {
    setShowModal(true);
  };

  const handleClearLog = () => {
    setLoading(true);
    setButtonState(false);
    axios
      .delete(CLEAR_ERROR_LIST_ENDPOINT)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setLoading(false);
          setResponseState('Error Log Cleared!');
        }
      })
      .catch((error: string) => {
        setLoading(false);
        setButtonState(true);
        setResponseState('Failed To Clear Log!');
      });
  };
  return (
    <div className="dashboard">
      <NavMenu />
      <ConfirmModal
        confirmButton={handleClearLog}
        show={showModal}
        setShow={setShowModal}
        message="Clear Error Log?"
      />
      <div className="dashboardParent">
        <h1>Error Log</h1>
        <ErrorTable setButtonState={setButtonState} />
        <div className="submitBtn">
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={clearButton}
            disabled={buttonState}
          >
            Clear Log
          </Button>
        </div>
        <div className="uploadStatus">{responseState}</div>
        <div className="loadingSpinner">
          {loading ? <CircularProgress /> : ''}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
