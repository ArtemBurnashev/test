import React from 'react';
import { Box } from '@mui/system';

type Children = (props: {
  handleClick: () => void;
  isLoading?: boolean;
  progress?: number;
  preview?: string;
}) => React.ReactNode;


interface Props {
  onChange: (image: string) => void;
  children: Children;
  previous?: string;
}

const UploadFile: React.FC<Props> = ({ children, onChange, previous }) => {

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [preview, setPreview] = React.useState(previous);
  const handleClick = () => inputRef.current?.click();

  const handleUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    
    if (files?.length) {
      const imagesForm = new FormData();

      [...files].forEach((file) => {
        if (file) {
          setPreview(URL.createObjectURL(file));
          imagesForm.append('file', file, file.name);
        }
      });
      
    }
    
  };

  return (
    <Box>
      <input
        ref={inputRef}
        onChange={handleUpload}
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        hidden
      />
      {children({ handleClick, preview })}
    </Box>
  )
}

export default UploadFile