import Image from 'next/image';
import React from 'react';
import {
  HorizontalCardImageWrapper,
  HorizontalCardWrapper,
} from './card.styles';
import Phone from 'assets/png/phone.png';
import { Stack, Typography } from '@mui/material';

const ProductCardHorizontal = () => {
  return (
    <HorizontalCardWrapper>
      <HorizontalCardImageWrapper>
        <Image layout="fixed" src={Phone} alt="product" />
      </HorizontalCardImageWrapper>
      <Stack spacing={4} justifyContent="space-between">
        <Typography variant="h3">
          Смартфон Samsung Galaxy A12 32GB Black (SM-A125F)
        </Typography>
        <Stack spacing={2} direction="row">
          <Typography fontWeight={500} variant="h3">
            5 329 000 Сум
          </Typography>
          <Typography sx={{ textDecoration: 'line-through' }} variant="body2">
            6 190 000 Сум
          </Typography>
        </Stack>
      </Stack>
    </HorizontalCardWrapper>
  );
};

export default ProductCardHorizontal;
