import React from 'react';
import { BrandWrapper } from './brands.styles';
import Sony from 'assets/png/sony.png';
import Image from 'next/image';
import { Stack } from '@mui/material';

const PopularBrend = () => {
  return (
    <BrandWrapper>
      <Image layout="fixed" src={Sony} alt="brand" />
    </BrandWrapper>
  );
};

const PopularBrands = () => (
  <Stack direction="row" flexWrap="wrap">
    <PopularBrend />
    <PopularBrend />
    <PopularBrend />
    <PopularBrend />
    <PopularBrend />
    <PopularBrend />
    <PopularBrend />
    <PopularBrend />
    <PopularBrend />
    <PopularBrend />
    <PopularBrend />
  </Stack>
);
export default PopularBrands;
