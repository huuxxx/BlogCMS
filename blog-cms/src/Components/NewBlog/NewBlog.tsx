import React, { useReducer, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import NavMenu from '../NavMenu/NavMenu';
import './NewBlog.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const cookies = new Cookies();

const axios = require('axios').default;

const NEW_BLOG_ENDPOINT = 'https://localhost:44358/api/BlogItems/CreateBlog';

type State = {
  title: string;
  content: string;
  isButtonDisabled: boolean;
};

const initialState: State = {
  title: '',
  content: '',
  isButtonDisabled: true,
};

type Action =
  | { type: 'setTitle'; payload: string }
  | { type: 'setContent'; payload: string }
  | { type: 'setIsButtonDisabled'; payload: boolean };

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
    default:
      return {
        ...state,
      };
  }
};

const NewBlog = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [editorState, setEditorState] = useState<string>(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    state.content = editorState;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.content, state.title]);

  const handleCreateBlog = async () => {
    await axios
      .post(
        NEW_BLOG_ENDPOINT,
        {
          title: state.title,
          content: state.content,
        },
        {
          headers: { Authorization: `Bearer ${cookies.get('token')}` },
        }
      )
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          // display success
        }
      })
      .catch((error: string) => {
        // display error
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
      payload: editorState,
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
          //   onChange={handleTitleChange}
          autoFocus
        />
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={setEditorState}
          //   onChange={handleContentChange}
        />
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
