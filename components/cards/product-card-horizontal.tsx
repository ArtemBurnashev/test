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
import { useAppSelector } from 'redux-state/hook';

interface ProductCardProps {
  name: string;
  image?: string | null;
  discount?: {
    currency: string;
    amount: number;
    amountInSum?: number | null
  };
  slug: string;
  id?: string;
  price?: {
    currency: string;
    amount: number;
    amountInSum?:number | null
  };
}

const ProductCardHorizontal: React.FC<ProductCardProps> = ({
  slug,
  price,
  discount,
  image,
  name,
}) => {
  const {currency} = useAppSelector(state => state.cart)
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
            {discount ? discount?.amountInSum : price?.amountInSum}{' '}
            {currency}
          </Typography>
          {discount && (
            <Typography sx={{ textDecoration: 'line-through' }} variant="body2">
              {price?.amountInSum} {currency}
            </Typography>
          )}
        </Stack>
      </Stack>
    </HorizontalCardWrapper>
  );
};

export default ProductCardHorizontal;
