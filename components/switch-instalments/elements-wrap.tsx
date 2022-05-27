import React from 'react';
import colors from 'config/theme';
import { Stack } from '@mui/material';

const ElementsWrap:React.FC = ({children}) => {
  return (
    <Stack
      sx={
        {
          border: `0.5px solid ${colors.grey.darc}`,
          padding: {lg:'24px 80px',xs:'20px'}
        }
      }
    >{children}</Stack>
  )
}

export default ElementsWrap; 