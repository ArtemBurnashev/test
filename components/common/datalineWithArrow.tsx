import { Box, Stack, Typography } from '@mui/material';
import colors from 'config/theme';
import React from 'react';

const DataLineWithArrow: React.FC<{ field?: string; value?: string }> = ({
  field,
  value,
}) => {
  return (
    <Stack marginTop="1rem" alignItems="center" spacing={2} width="100%" direction="row">
      <Typography variant="subtitle2">{field}:</Typography>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,

          height: '1px',
          backgroundColor: colors.grey.default,
        }}
      />
      <Typography variant="subtitle2">{value}</Typography>
    </Stack>
  );
};

export default DataLineWithArrow;
