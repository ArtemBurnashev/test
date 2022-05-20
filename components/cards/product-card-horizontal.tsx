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
  productInfo:boolean | null;
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
  productInfo
}) => {
  const { currency } = useAppSelector(state => state.cart);
  const navigator = useRouter();
  const router = useRouter();  
  return (
    <HorizontalCardWrapper
      onClick={() => {
        navigator.push(`${Paths.PRODUCT_DETAILS}${slug}`);
        modalOpen ? modalOpen() : '';
      }}
    >
      <HorizontalCardImageWrapper>
        <LazyImage src={image || ''} alt="product" />
      </HorizontalCardImageWrapper>
      <Stack spacing={4} justifyContent="space-between">
        <Typography
          sx={{
            textTransform: 'capitalize',
            cursor: 'pointer',
            maxWidth: '249px',
          }}
          component="a"
          variant="h3"
        >
          {name.toLowerCase()}
        </Typography>
        <Stack spacing={2} direction="row">
          <Typography fontWeight={500} variant="h3">
            {discount?.amountInSum && price?.amountInSum
              ? formatter(price?.amountInSum - discount?.amountInSum)
              : formatter(price?.amountInSum || 0)}
            {currency}
          </Typography>
          {discount && (
            <Typography sx={{ textDecoration: 'line-through' }} variant="body2">
              {formatter(price?.amountInSum)} {currency}
            </Typography>
          )}
        </Stack>
        {!productInfo && (
          <Typography color={colors.primary.hover}>
            Временно Недоступно
          </Typography>
        )}
      </Stack>
    </HorizontalCardWrapper>
  );
};

export default ProductCardHorizontal;
