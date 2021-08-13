import React, { useReducer, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { CircularProgress } from '@material-ui/core';
import NavMenu from '../NavMenu/NavMenu';
import './NewBlog.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const cookies = new Cookies();

const axios = require('axios').default;

const CREATE_BLOG_ENDPOINT = process.env.REACT_APP_ENDPOINT_BLOG_CREATE;
const IMAGE_UPLOAD_ENDPOINT = process.env.REACT_APP_ENDPOINT_IMAGE_UPLOAD;

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
  const [uploadedImages, setUploadedImages] = useState([]);

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

  const uploadImage = (file) =>
    new Promise((resolve, reject) => {
      const data = new FormData();
      data.append('file', file);
      data.append('name', 'name');
      //   const formHeaders = data.getHeaders();
      axios
        .post(IMAGE_UPLOAD_ENDPOINT, {
          file: data,
          headers: {
            // Authorization: `Bearer ${cookies.get('token')}`,
            // 'Content-Type': 'multipart/form-data',
            // ...formHeaders,
          },
          //   data,
        })
        .then((response: AxiosResponse) => {
          resolve({
            data: {
              link: response,
            },
          });
        })
        .catch((error: string) => {
          reject(error);
        });
    });

  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open(
        'POST',
        IMAGE_UPLOAD_ENDPOINT ??
          'https://blogapi.huxdev.com/api/Blog/UploadImage'
      );
      const data = new FormData(); // eslint-disable-line no-undef
      data.append('file', file);
      xhr.addEventListener('load', () => {
        resolve(xhr.responseText);
      });
      xhr.addEventListener('error', () => {
        // eslint-disable-next-line no-console
        console.log(xhr.response);
        reject();
      });
      xhr.send(data);
    });
  }

  const handleCreateBlog = () => {
    setLoading(true);
    setUploadDisable(true);
    const contentToHtml = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(contentToHtml);
    axios
      .post(
        CREATE_BLOG_ENDPOINT,
        {
          title: state.title,
          content: markup,
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
    <div style={{ marginBottom: 50 }}>
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
          editorStyle={{ border: '1px solid', marginBottom: '5px' }}
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbar={{
            image: {
              uploadCallback: uploadImageCallBack,
              previewImage: true,
              alt: { present: true, mandatory: true },
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            },
          }}
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
