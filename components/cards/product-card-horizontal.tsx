import Image from 'next/image';
import React from 'react';
import {
  HorizontalCardImageWrapper,
  HorizontalCardWrapper,
} from './card.styles';
import Phone from 'assets/png/phone.png';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Paths } from 'config/site-paths';
import { LazyImage } from 'components/image';
import colors from 'config/theme';
import { useAppSelector } from 'redux-state/hook';
import formatter from 'utils/currencyFormatter';

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
    amountInSum?: number | null
  };
  modalOpen?: () => void;
}

const ProductCardHorizontal: React.FC<ProductCardProps> = ({
  slug,
  price,
  discount,
  image,
  name,
  modalOpen,
}) => {
  const { currency } = useAppSelector(state => state.cart);
  const navigator = useRouter();
  return (
    <HorizontalCardWrapper>
      <HorizontalCardImageWrapper>
        <LazyImage src={image || ''} alt="product" />
      </HorizontalCardImageWrapper>
      <Stack spacing={4} justifyContent="space-between">
        <Typography
          onClick={() => { navigator.push(`${Paths.PRODUCT_DETAILS}${slug}`); modalOpen ? modalOpen() : '' }}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              color: colors.primary.default,
            },
            maxWidth:'249px'
          }}
          component="a"
          variant="h3"
        >
          {name}
        </Typography>
        <Stack spacing={2} direction="row">
          <Typography fontWeight={500} variant="h3">
            {discount ? formatter(discount?.amountInSum) : formatter(price?.amountInSum)}{' '}
            {currency}
          </Typography>
          {discount && (
            <Typography sx={{ textDecoration: 'line-through' }} variant="body2">
              {formatter(price?.amountInSum)} {currency}
            </Typography>
          )}
        </Stack>
      </Stack>
    </HorizontalCardWrapper>
  );
};

export default ProductCardHorizontal;
