import { Stack, Typography } from '@mui/material';
import Heart from 'components/icons/heart';
import Image from 'next/image';
import React from 'react';
import {
  ProductCardImageWrapper,
  ProductCardLabel,
  ProductCardWrapper,
  ProductHeartWrapper,
} from './card.styles';
import Cart from 'components/icons/cart';
import { useRouter } from 'next/router';
import { addToCart } from 'redux-state/features/cart/cart-slice';
import { useAppDispatch, useAppSelector } from 'redux-state/hook';
import { Button } from 'components/button';
import Eye from 'components/icons/eye';
import { LazyImage } from 'components/image';
import { Paths } from 'config/site-paths';

interface ProductCardProps {
  name: string;
  media?:
    | {
        url: string;
        alt: string;
      }[]
    | null;
  thumbnail?: string;
  discount?: {
    currency: string;
    amount: number;
  };
  slug: string;
  id?: string;
  startPrice?: {
    currency: string;
    amount: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  media,
  discount,
  slug,
  id,
  startPrice,
}) => {
  const navigator = useRouter();
  const dispatch = useAppDispatch();
  const { cartProducts } = useAppSelector((state) => state.cart);
  const isInCard = cartProducts.some((product) => product.id === id);
  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    if (isInCard) return navigator.push(Paths.CART);
    if(id) 
    dispatch(
      addToCart({
        id,
        image: (media && media[0].url) || '',
        price: discount || startPrice,
        is_saved: false,
        name,
        variant: "",
        slug
      })
    );
  };

  return (
    <ProductCardWrapper
      
    >
      {discount && startPrice && (
        <ProductCardLabel isNew={!!!discount}>
          <Typography color="white" fontSize="0.75rem">
            {discount.amount !== startPrice.amount && "-"}{Math.floor(100 - (discount.amount / startPrice?.amount) * 100)}%
          </Typography>
        </ProductCardLabel>
      )}
      <ProductHeartWrapper isSaved={false}>
        <Heart />
      </ProductHeartWrapper>
      <Stack spacing={2}>
        <ProductCardImageWrapper>
          <LazyImage
            src={(media && media[0]?.url) || ''}
            alt={(media && media[0]?.alt) || 'product_image'}
          />
        </ProductCardImageWrapper>
        <Typography
          variant="subtitle2"
          sx={{":hover":{
            color: "#FEEE00",
          }}}
          onClick={() => navigator.push(`${Paths.PRODUCT_DETAILS}${slug}`)}
        >
          {name}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Stack>
            {discount && (
              <Typography
                sx={{ textDecoration: 'line-through' }}
                variant="body2"
              >
                {startPrice?.amount} {startPrice?.currency}
              </Typography>
            )}
            <Typography variant="h3" fontWeight={600}>
              {discount ? discount?.amount : startPrice?.amount}{' '}
              {discount ? discount?.currency : startPrice?.currency}
            </Typography>
          </Stack>
          <Button
            onClick={handleAddToCart}
            variant="contained"
            sx={{
              '.MuiButtonBase-root': {
                pl: 0,
                pr: 0,
              },
            }}
          >
            {isInCard ? <Eye /> : <Cart />}
          </Button>
        </Stack>
      </Stack>
    </ProductCardWrapper>
  );
};

export default ProductCard;
