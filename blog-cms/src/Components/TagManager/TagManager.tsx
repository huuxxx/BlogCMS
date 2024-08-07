import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import NavMenu from '../NavMenu/NavMenu';
import TagButton from '../TagButton/TagButton';
import { Button, TextField } from '@mui/material';
import Cookies from 'universal-cookie';
import ConfirmModal from '../Modals/ConfirmModal';

const cookies = new Cookies();

const axios = require('axios').default;

const TAGS_ENDPOINT = process.env.REACT_APP_ENDPOINT_TAGS;

const TagManager = () => {
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [addDisabled, setAddDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteDisabled, setDeleteDisabled] = useState(true);

  useEffect(() => {
    getTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTags = () => {
    axios
      .get(TAGS_ENDPOINT)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setAllTags(response.data);
        }
      })
      .catch((error: string) => {});
  };

  const handleAddTag = (tag: string) => {
    setSelectedTags((prevTags) => [...prevTags, tag]);
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  useEffect(() => {
    if (selectedTags.length > 0) {
      setDeleteDisabled(false);
    } else {
      setDeleteDisabled(true);
    }
  }, [selectedTags]);

  const uploadTag = () => {
    axios
      .post(
        TAGS_ENDPOINT,
        {
          name: newTag,
        },
        {
          headers: { Authorization: `Bearer ${cookies.get('token')}` },
        }
      )
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setNewTag('');
          setAddDisabled(true);
          getTags();
        }
      })
      .catch((error: string) => {});
  };

  const deleteButton = () => {
    setShowModal(!showModal);
  };

  const deleteTags = () => {
    axios
      .delete(TAGS_ENDPOINT, {
        data: selectedTags,
        headers: { Authorization: `Bearer ${cookies.get('token')}` },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          getTags();
          setSelectedTags([]);
        }
      })
      .catch((error: string) => {});
  };

  const handleNewTagChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setNewTag(event.target.value);
    if (allTags.includes(event.target.value) || event.target.value === '') {
      setAddDisabled(true);
    } else {
      setAddDisabled(false);
    }
  };

  return (
    <div className="page-parent">
      <div className="page-sub-parent">
        <NavMenu />
        <ConfirmModal
          confirmButton={deleteTags}
          show={showModal}
          setShow={setShowModal}
          message={`Delete Tag${selectedTags.length > 1 ? 's' : ''}?`}
        />
        <div>
          <h1>Tags</h1>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <TextField
            id="New tag"
            label="New tag"
            variant="outlined"
            style={{ marginRight: '5px' }}
            onChange={handleNewTagChange}
            value={newTag}
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            className="submitBtn"
            onClick={uploadTag}
            disabled={addDisabled}
          >
            + Add
          </Button>
        </div>

        {allTags
          ?.filter((tag) => tag.trim() !== '')
          .map((item) => (
            <TagButton
              key={item}
              tagName={item}
              isSelected={false}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
              disabled={false}
            ></TagButton>
          ))}

        <div style={{ marginTop: '5px' }}>
          <Button
            variant="contained"
            size="large"
            color="error"
            className="submitBtn"
            onClick={deleteButton}
            disabled={deleteDisabled}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TagManager;
