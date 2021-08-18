import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { CircularProgress } from '@material-ui/core';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import NavMenu from '../NavMenu/NavMenu';
import ConfirmModal from '../Modals/ConfirmModal';
import './BlogEdit.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const cookies = new Cookies();

const axios = require('axios').default;

const DELETE_BLOG_ENDPOINT = process.env.REACT_APP_ENDPOINT_BLOG_DELETE;
const EDIT_BLOG_ENDPOINT = process.env.REACT_APP_ENDPOINT_BLOG_EDIT;
const GET_BLOG_ENDPOINT = process.env.REACT_APP_ENDPOINT_BLOG_GET;
const IMAGE_UPLOAD_ENDPOINT = process.env.REACT_APP_ENDPOINT_IMAGE_UPLOAD;

const BlogEdit = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [responseState, setResponseState] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const [titleState, setTitleState] = useState('');
  const [showModal, setshowModal] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    axios
      .post(GET_BLOG_ENDPOINT, {
        preventIncrement: true,
        id: match.params.id,
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setTitleState(response.data.title);
          const blocksFromHtml = htmlToDraft(response.data.content);
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
          );
          setEditorState(EditorState.createWithContent(contentState));
        }
      })
      .catch((error: string) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        resolve({ data: { link: xhr.responseText } });
      });
      xhr.addEventListener('error', () => {
        reject();
      });
      xhr.send(data);
    });
  }

  const handleEditBlog = () => {
    setLoading(true);
    setButtonState(true);
    const contentToHtml = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(contentToHtml);
    axios
      .post(
        EDIT_BLOG_ENDPOINT,
        {
          id: match.params.id,
          title: titleState,
          content: markup,
        },
        {
          headers: { Authorization: `Bearer ${cookies.get('token')}` },
        }
      )
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setLoading(false);
          setResponseState('Successfully Updated!');
        }
      })
      .catch((error: string) => {
        setLoading(false);
        setButtonState(false);
        setResponseState('Failed To Update!');
      });
  };

  const deleteButton = () => {
    setshowModal(true);
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
          setResponseState('Blog Deleted!');
        }
      })
      .catch((error: string) => {
        setLoading(false);
        setButtonState(false);
        setResponseState('Failed To Delete!');
      });
  };

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setTitleState(event.target.value);
  };

  return (
    <div style={{ marginBottom: 50, marginLeft: 50 }}>
      <NavMenu />
      <ConfirmModal
        confirmButton={handleDeleteBlog}
        show={showModal}
        setShow={setshowModal}
        message="Delete Blog?"
      />
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
          disabled={buttonState}
        />
        <Editor
          editorState={editorState}
          editorStyle={{ border: '1px solid', marginBottom: '5px' }}
          onEditorStateChange={setEditorState}
          readOnly={buttonState}
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
          style={{ marginRight: '5px' }}
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
          onClick={deleteButton}
          disabled={buttonState}
        >
          Delete
        </Button>
      </form>
      <div className="uploadStatus">{responseState}</div>
      <div className="loadingSpinner">
        {loading ? <CircularProgress /> : ''}
      </div>
    </div>
  );
};

export default BlogEdit;
