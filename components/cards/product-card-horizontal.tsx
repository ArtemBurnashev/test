import Image from 'next/image';
import React from 'react';
import {
  HorizontalCardImageWrapper,
  HorizontalCardWrapper,
} from './card.styles';
import Phone from 'assets/png/phone.png';
import { Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { Paths } from 'config/site-paths';
import { LazyImage } from 'components/image';
import colors from 'config/theme';

interface ProductCardProps {
  name: string;
  image?: string | null;
  discount?: {
    currency: string;
    amount: number;
  };
  slug: string;
  id?: string;
  price?: {
    currency: string;
    amount: number;
  };
}

const ProductCardHorizontal: React.FC<ProductCardProps> = ({
  slug,
  price,
  discount,
  image,
  name,
}) => {
  return (
    <HorizontalCardWrapper>
      <HorizontalCardImageWrapper>
        <LazyImage src={image || ''} alt="product" />
      </HorizontalCardImageWrapper>
      <Stack spacing={4} justifyContent="space-between">
        <Link href={`${Paths.PRODUCT_DETAILS}${slug}`}>
          <Typography
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: colors.primary.default,
              },
            }}
            component="a"
            variant="h3"
          >
            {name}
          </Typography>
        </Link>
        <Stack spacing={2} direction="row">
          <Typography fontWeight={500} variant="h3">
            {discount ? discount?.amount : price?.amount}{' '}
            {discount ? discount?.currency : price?.currency}
          </Typography>
          {discount && (
            <Typography sx={{ textDecoration: 'line-through' }} variant="body2">
              {price?.amount} {price?.currency}
            </Typography>
          )}
        </Stack>
      </Stack>
    </HorizontalCardWrapper>
  );
};

export default ProductCardHorizontal;
