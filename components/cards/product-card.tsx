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
import { addToCart } from 'redux-state/features/cart-slice';
import { useAppDispatch, useAppSelector } from 'redux-state/hook';
import { Button } from 'components/button';
import Eye from 'components/icons/eye';
import { LazyImage } from 'components/image';
import { Paths } from 'config/site-paths';
import { dislike, like } from 'redux-state/features/likes';
import formatter from 'utils/currencyFormatter';

interface ProductCardProps {
  name: string;
  infoProduct: boolean | null;
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
    amountInSum?: number | null;
  };
  slug: string;
  id?: string;
  startPrice?: {
    currency: string;
    amount: number;
    amountInSum?: number | null;
  };
  variant: string;
  modalOpen?: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  media,
  discount,
  slug,
  id,
  startPrice,
  variant,
  modalOpen,
  infoProduct,
}) => {
  const navigator = useRouter();
  const dispatch = useAppDispatch();
  const { cartProducts, currency } = useAppSelector((state) => state.cart);
  const { likeList } = useAppSelector((state) => state.like);
  const isInCard = cartProducts.some((product) => product.id === id);
  const isInLikeList = likeList.some((product) => product.id === id);


  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    if (isInCard) return navigator.push(Paths.CART);
    if ((id && startPrice?.amountInSum) || discount?.amountInSum) {
      dispatch(
        addToCart({
          id,
          image: (media && media[0].url) || '',
          price: discount || startPrice,
          is_saved: false,
          name,
          variant,
          slug,
        })
      );
    }
  };

  const handleLikeDislike = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation()
    if (id && startPrice?.amountInSum) {
      if (isInLikeList) {
        return dispatch(dislike(id));
      }
      return dispatch(
        like({
          id,
          image: (media && media[0].url) || '',
          price: startPrice,
          discount,
          name,
          variant,
          slug,
        })
      );
    }
  };

  return (
    <ProductCardWrapper onClick={() => { navigator.push(`${Paths.PRODUCT_DETAILS}${slug}`); modalOpen ? modalOpen() : '' }}>
      {discount && startPrice && (
        <ProductCardLabel isNew={!!!discount}>
          {discount.amountInSum && startPrice.amountInSum && (
            <Typography color="white" fontSize="0.75rem">
              {discount.amountInSum !== startPrice.amountInSum && '-'}
              {Math.floor(
                100 - (discount.amountInSum / startPrice?.amountInSum) * 100
              )}
              %
            </Typography>
          )}
        </ProductCardLabel>
      )}
      <ProductHeartWrapper isSaved={isInLikeList} onClick={handleLikeDislike}>
        <Heart />
      </ProductHeartWrapper>
      <Stack justifyContent="space-between" height={323} spacing={2}>
        <ProductCardImageWrapper>
          <LazyImage

            src={(media && media[0]?.url) || ''}
            alt={(media && media[0]?.alt) || 'product_image'}
          />
        </ProductCardImageWrapper>
        <Typography
          height="auto"
          variant="subtitle2"
          textTransform="capitalize"
        >
          {name.toLowerCase()}
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
                {formatter(startPrice?.amountInSum || 0)} {currency}
              </Typography>
            )}
            <Typography variant="h3" fontWeight={600} onClick={(e) => e.stopPropagation()}>
              {discount ? formatter(discount?.amountInSum || 0) : formatter(startPrice?.amountInSum || 0)}{' '}
              {currency}
            </Typography>
          </Stack>
          {infoProduct ?
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
            :
            <Typography variant='body2'>Недоступно</Typography>
          }

        </Stack>
      </Stack>
    </ProductCardWrapper>
  );
};

export default ProductCard;
