import React, { useReducer, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NavMenu from '../NavMenu/NavMenu';
import './NewBlog.css';

const axios = require('axios').default;

const LOGIN_ENDPOINT = 'https://localhost:44358/api/BlogItems/CreateBlog';

type State = {
  title: string;
  content: string;
  isButtonDisabled: boolean;
  isError: boolean;
};

const initialState: State = {
  title: '',
  content: '',
  isButtonDisabled: true,
  isError: false,
};

type Action =
  | { type: 'setTitle'; payload: string }
  | { type: 'setContent'; payload: string }
  | { type: 'setIsButtonDisabled'; payload: boolean }
  | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setTitle':
      return {
        ...state,
        title: action.payload,
      };
    case 'setContent':
      return {
        ...state,
        content: action.payload,
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

const NewBlog = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.title.trim() && state.content.trim()) {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: false,
      });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true,
      });
    }
  }, [state.content, state.title]);

  const handleCreateBlog = async () => {
    await axios
      .post(LOGIN_ENDPOINT, {
        title: state.title,
        content: state.content,
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          // successful post
        }
      })
      .catch((error: string) => {
        // unsuccessful
      });
  };

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setTitle',
      payload: event.target.value,
    });
  };

  const handleContentChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setContent',
      payload: event.target.value,
    });
  };

  return (
    <div>
      <NavMenu />
      New Blog
      <form className="container" noValidate autoComplete="off">
        <div>
          <TextField
            error={state.isError}
            fullWidth
            id="title"
            label="Title"
            margin="normal"
            onChange={handleTitleChange}
          />
          <TextField
            error={state.isError}
            fullWidth
            id="content"
            label="Content"
            margin="normal"
            onChange={handleContentChange}
          />
        </div>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          className="submitBtn"
          onClick={handleCreateBlog}
          disabled={state.isButtonDisabled}
        >
          Upload
        </Button>
      </form>
    </div>
  );
};

export default NewBlog;
