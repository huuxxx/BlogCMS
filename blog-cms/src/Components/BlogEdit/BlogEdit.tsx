import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromHtml } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { CircularProgress } from '@material-ui/core';
import NavMenu from '../NavMenu/NavMenu';
import './BlogEdit.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const cookies = new Cookies();

const axios = require('axios').default;

const DELETE_BLOG_ENDPOINT = process.env.REACT_APP_ENDPOINT_BLOG_DELETE;
const EDIT_BLOG_ENDPOINT = process.env.REACT_APP_ENDPOINT_BLOG_EDIT;
const GET_BLOG_ENDPOINT = process.env.REACT_APP_ENDPOINT_BLOG_GET;

type BlogItem = {
  Id: number;
  Title: string;
  Content: string;
  Requests: number;
  DateCreated: string;
  DateModified: string;
};

const initialState: BlogItem = {
  Id: 0,
  Title: '',
  Content: '',
  Requests: 0,
  DateCreated: '',
  DateModified: '',
};

const BlogEdit = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [successfulUpload, setSuccessfulUpload] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const [titleState, setTitleState] = useState('');
  const [blogItem, setBlogItem] = useState<BlogItem>(initialState);
  const [contentState, setContentState] = useState('');

  useEffect(() => {
    axios
      .post(GET_BLOG_ENDPOINT, {
        preventIncrement: true,
        id: match.params.id,
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setTitleState(response.data.title);
          setContentState(convertFromHtml(response.data.content));
        }
      })
      .catch((error: string) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditBlog = () => {
    setLoading(true);
    setButtonState(true);
    const contentToHtml = convertToHTML(contentState);
    axios
      .post(
        EDIT_BLOG_ENDPOINT,
        {
          id: match.params.id,
          title: titleState,
          content: contentToHtml,
        },
        {
          headers: { Authorization: `Bearer ${cookies.get('token')}` },
        }
      )
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setLoading(false);
          setSuccessfulUpload('Successfully Updated!');
        }
      })
      .catch((error: string) => {
        setLoading(false);
        setButtonState(false);
        setSuccessfulUpload('Failed To Update!');
      });
  };

  const handleDeleteBlog = () => {
    setLoading(true);
    setButtonState(true);
    axios
      .post(
        DELETE_BLOG_ENDPOINT,
        {
          id: match.params.id,
        },
        {
          headers: { Authorization: `Bearer ${cookies.get('token')}` },
        }
      )
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setLoading(false);
          setSuccessfulUpload('Blog Deleted!');
        }
      })
      .catch((error: string) => {
        setLoading(false);
        setButtonState(false);
        setSuccessfulUpload('Failed To Delete!');
      });
  };

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setTitleState(event.target.value);
  };

  return (
    <div>
      <NavMenu />
      <form className="formParent" noValidate autoComplete="off">
        <h1>Edit Blog</h1>
        <TextField
          fullWidth
          id="title"
          label="Title"
          margin="normal"
          value={titleState}
          onChange={handleTitleChange}
          autoFocus
        />
        <Editor
          initialContentState={contentState}
          editorState={contentState}
          value={contentState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={setContentState}
        />
        <Button
          variant="contained"
          size="large"
          color="primary"
          className="submitBtn"
          onClick={handleEditBlog}
          disabled={buttonState}
        >
          Update
        </Button>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          className="submitBtn"
          onClick={handleDeleteBlog}
          disabled={buttonState}
        >
          Delete
        </Button>
      </form>
      <div className="uploadStatus">{successfulUpload}</div>
      <div className="loadingSpinner">
        {loading ? <CircularProgress /> : ''}
      </div>
    </div>
  );
};

export default BlogEdit;
