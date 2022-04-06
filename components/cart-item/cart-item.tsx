import React from 'react';
import { CartItemImage, CartItemWrapper } from './cart-item.styles';
import Image from 'next/image';
import { Stack, Typography } from '@mui/material';
import { Button } from 'components/button';
import Heart from 'components/icons/heart';
import Trash from 'components/icons/trash';
import colors from 'config/theme';
import CartController from './cart-controller';
import { CartProduct, removeItem } from 'redux-state/features/cart/cart-slice';
import { useAppDispatch, useAppSelector } from 'redux-state/hook';
import Link from 'next/link';
import { Paths } from 'config/site-paths';
import { LazyImage } from 'components/image';

const CartItem: React.FC<CartProduct> = ({
  count,
  name,
  price,
  id,
  image,
  variant,
  slug,
}) => {
  const dispatch = useAppDispatch();
  const {currency} = useAppSelector(state => state.cart)

  const handleRemoveItem = () => {
    dispatch(removeItem(id));
  };

  return (
    <CartItemWrapper>
      <CartItemImage>
        <LazyImage src={image} alt="product_image" />
      </CartItemImage>
      <Stack width="100%" spacing={1}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction="row"
          width="100%"
          flexWrap="wrap"
        >
          <Typography
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                fontSize: '1rem',
              },
            })}
            variant="h2"
          >
            <Link href={`${Paths.PRODUCT_DETAILS}${slug}`}>
              <a>{name}</a>
            </Link>
          </Typography>
          <Typography
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                fontSize: '1rem',
              },
            })}
            fontWeight={600}
            variant="h2"
          >
            {price?.amountInSum} {currency}
          </Typography>
        </Stack>
        <Typography variant="subtitle2">{variant}</Typography>
        <Stack flexWrap="wrap" direction="row">
          <Stack flexWrap="wrap" marginRight="auto" direction="row">
            <Button
              sx={{ color: colors.grey.default, padding: '0.625em .2em' }}
              size="small"
              startIcon={<Heart />}
            >
              В избранное
            </Button>
            <Button
              size="small"
              startIcon={<Trash />}
              sx={{ color: colors.grey.default, padding: '0.625em .2em' }}
              onClick={handleRemoveItem}
            >
              Удалить
            </Button>
          </Stack>
          <CartController id={id} count={count} />
        </Stack>
      </Stack>
    </CartItemWrapper>
  );
};

export default CartItem;
