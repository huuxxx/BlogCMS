import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import NavMenu from '../NavMenu/NavMenu';
import TagButton from '../TagButton/TagButton';
import { Button, TextField } from '@mui/material';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get('token');

const axios = require('axios').default;

const TAGS_ENDPOINT = process.env.REACT_APP_ENDPOINT_TAGS;

const TagManager = () => {
  //   const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState(['']);
  const [selectedTags, setSelectedTags] = useState(['']);
  const [newTag, setNewTag] = useState('');

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

  const uploadTag = () => {
    axios
      .post(
        TAGS_ENDPOINT,
        {
          name: newTag,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          getTags();
        }
      })
      .catch((error: string) => {});
  };

  const deleteTags = () => {
    axios
      .delete(TAGS_ENDPOINT, {
        data: selectedTags,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          getTags();
          setSelectedTags(['']);
        }
      })
      .catch((error: string) => {});
  };

  const handleNewTagChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setNewTag(event.target.value);
  };

  return (
    <div className="page-parent">
      <div className="page-sub-parent">
        <NavMenu />
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
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            className="submitBtn"
            onClick={uploadTag}
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
            color="secondary"
            className="submitBtn"
            onClick={deleteTags}
            disabled={false}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TagManager;
