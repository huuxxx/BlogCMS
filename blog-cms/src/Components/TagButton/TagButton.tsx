import { ToggleButton } from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
  tagName: string;
  isSelected: boolean;
  disabled: boolean;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const TagButton: React.FC<Props> = ({
  tagName,
  isSelected,
  disabled,
  onAddTag,
  onRemoveTag,
}) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  const handleToggle = () => {
    setSelected(!selected);
    if (!selected) {
      onAddTag(tagName);
    } else {
      onRemoveTag(tagName);
    }
  };

  return (
    <>
      <ToggleButton
        style={{ marginRight: '2px' }}
        key={tagName}
        value="check"
        selected={selected}
        onChange={handleToggle}
        size="small"
        disabled={disabled}
      >
        {tagName}
      </ToggleButton>
    </>
  );
};

export default TagButton;
