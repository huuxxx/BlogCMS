import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import NavMenu from '../NavMenu/NavMenu';
import ConfirmModal from '../Modals/ConfirmModal';
import './BlogEditor.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, CircularProgress, TextField } from '@mui/material';
import TagButton from '../TagButton/TagButton';

const cookies = new Cookies();
const token = cookies.get('token');

const axios = require('axios').default;

const BLOG_ENDPOINT = process.env.REACT_APP_ENDPOINT_BLOG;
const IMAGE_ENDPOINT = process.env.REACT_APP_ENDPOINT_IMAGE;
const TAGS_ENDPOINT = process.env.REACT_APP_ENDPOINT_TAGS;

interface Props {
  blogId?: string;
  editBlog: boolean;
}

const BlogEditor: React.FC<Props> = ({ blogId, editBlog }) => {
  const [loading, setLoading] = useState(false);
  const [responseState, setResponseState] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const [titleState, setTitleState] = useState('');
  const [showModal, setshowModal] = useState(false);
  const [blogTags, setBlogTags] = useState(['']);
  const [allTags, setAllTags] = useState(['']);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    axios
      .get(TAGS_ENDPOINT)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setAllTags(response.data);
        }
      })
      .catch((error: string) => {});

    if (!editBlog) {
      return;
    }

    axios
      .get(`${BLOG_ENDPOINT}/${blogId}`, {
        increment: false,
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
          setBlogTags(response.data.tags);
        }
      })
      .catch((error: string) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId]);

  function uploadImageCallBack(file) {
    const formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      axios
        .post(IMAGE_ENDPOINT!, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          resolve({ data: { link: response.data } });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  const handleEditBlog = () => {
    setLoading(true);
    setButtonState(true);
    const contentToHtml = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(contentToHtml);
    axios
      .put(
        BLOG_ENDPOINT,
        {
          id: blogId,
          title: titleState,
          content: markup,
          tags: blogTags,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
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

  const handleCreateBlog = () => {
    setLoading(true);
    setButtonState(true);
    const contentToHtml = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(contentToHtml);
    axios
      .post(
        BLOG_ENDPOINT,
        {
          title: titleState,
          content: markup,
          tags: blogTags,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setLoading(false);
          setResponseState('Successfully Uploaded!');
        }
      })
      .catch((error: string) => {
        setLoading(false);
        setButtonState(false);
        setResponseState('Failed To Upload!');
      });
  };

  const deleteButton = () => {
    setshowModal(true);
  };

  const handleDeleteBlog = () => {
    setLoading(true);
    setButtonState(true);
    axios
      .delete(`${BLOG_ENDPOINT}/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
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

  const handleAddTag = (tag: string) => {
    setBlogTags((prevTags) => [...prevTags, tag]);
  };

  const handleRemoveTag = (tag: string) => {
    setBlogTags((prevTags) => prevTags.filter((t) => t !== tag));
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
        <h1>{editBlog ? 'Edit' : 'Create'} Blog</h1>
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

        {allTags
          ?.filter((tag) => tag.trim() !== '')
          .map((item) => (
            <TagButton
              key={item}
              tagName={item}
              isSelected={blogTags.includes(item)}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
              disabled={buttonState}
            ></TagButton>
          ))}

        <div style={{ marginTop: '20px' }}>
          <Button
            style={{ marginRight: '5px' }}
            variant="contained"
            size="large"
            color="primary"
            className="submitBtn"
            onClick={editBlog ? handleEditBlog : handleCreateBlog}
            disabled={buttonState}
          >
            {editBlog ? 'Update' : 'Create'}
          </Button>
          {editBlog && (
            <Button
              variant="contained"
              size="large"
              color="error"
              className="submitBtn"
              onClick={deleteButton}
              disabled={buttonState}
            >
              Delete
            </Button>
          )}
        </div>
      </form>
      <div className="uploadStatus">{responseState}</div>
      <div className="loadingSpinner">
        {loading ? <CircularProgress /> : ''}
      </div>
    </div>
  );
};

export default BlogEditor;
