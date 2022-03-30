import { Stack, Typography } from '@mui/material';
import ProductCardHorizontal from 'components/cards/product-card-horizontal';
import Spacer from 'components/common/spacer';
import React from 'react';

const ProductColumn: React.FC<{ label: string }> = ({ label }) => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">{label}</Typography>
      <Spacer />
      <ProductCardHorizontal />
      <ProductCardHorizontal />
      <ProductCardHorizontal />
    </Stack>
  );
};

export default ProductColumn;
