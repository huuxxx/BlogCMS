import React, { useReducer, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { CircularProgress } from '@material-ui/core';
import NavMenu from '../NavMenu/NavMenu';
import './NewBlog.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const cookies = new Cookies();

const axios = require('axios').default;

const NEW_BLOG_ENDPOINT = 'https://blogapi.huxdev.com/api/Blog/CreateBlog';
// const NEW_BLOG_ENDPOINT = 'https://localhost:44358/api/Blog/CreateBlog';

type State = {
  title: string;
  isButtonDisabled: boolean;
};

const initialState: State = {
  title: '',
  isButtonDisabled: true,
};

type Action =
  | { type: 'setTitle'; payload: string }
  | { type: 'setIsButtonDisabled'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setTitle':
      return {
        ...state,
        title: action.payload,
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

const NewBlog = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const [successfulUpload, setSuccessfulUpload] = useState('');
  const [uploadDisabled, setUploadDisable] = useState(false);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (state.title.trim()) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.title]);

  const handleCreateBlog = () => {
    setLoading(true);
    setUploadDisable(true);
    const contentToHtml = convertToHTML(editorState.getCurrentContent());
    axios
      .post(
        NEW_BLOG_ENDPOINT,
        {
          title: state.title,
          content: contentToHtml,
        },
        {
          headers: { Authorization: `Bearer ${cookies.get('token')}` },
        }
      )
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setLoading(false);
          setSuccessfulUpload('Successfully Uploaded!');
        }
      })
      .catch((error: string) => {
        setLoading(false);
        setUploadDisable(false);
        setSuccessfulUpload('Failed To Upload!');
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

  return (
    <div>
      <NavMenu />
      <form className="formParent" noValidate autoComplete="off">
        <h1>New Blog</h1>
        <TextField
          fullWidth
          id="title"
          label="Title"
          margin="normal"
          onChange={handleTitleChange}
          autoFocus
        />
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={setEditorState}
        />
        <Button
          variant="contained"
          size="large"
          color="primary"
          className="submitBtn"
          onClick={handleCreateBlog}
          disabled={uploadDisabled}
        >
          Upload
        </Button>
      </form>
      <div className="uploadStatus">{successfulUpload}</div>
      <div className="loadingSpinner">
        {loading ? <CircularProgress /> : ''}
      </div>
    </div>
  );
};

export default NewBlog;
