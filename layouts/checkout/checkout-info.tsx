import { Divider, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useAppSelector } from 'redux-state/hook';
import { CheckoutCartItem, CheckoutCartItemImage } from './checkout.styles';

const CheckoutInfo = () => {
  const { cartProducts, totalPrice, currency } = useAppSelector(
    (state) => state.cart
  );
  return (
    <Stack spacing={2}>
      {cartProducts.map((product) => (
        <CheckoutCartItem key={product.id}>
          <Stack mt={2} direction="row" spacing={2} alignItems="center">
            <CheckoutCartItemImage>
              <Image
                layout="fixed"
                width={100}
                height={100}
                src={product.image}
                alt={product.name}
              />
            </CheckoutCartItemImage>
            <Typography variant="subtitle2">{product.name}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography variant="subtitle2">{product.count}</Typography>
            <Typography variant="subtitle2">x</Typography>
            <Typography fontSize="1.25rem" fontWeight={600}>
              {product.price?.amount} {product.price?.currency}
            </Typography>
          </Stack>
        </CheckoutCartItem>
      ))}
      <Divider />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle2">Сумма по товарам</Typography>
        <Typography fontSize="1.25rem" fontWeight={600}>
          {totalPrice} {currency}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2">Стоимость доставки </Typography>
        <Typography fontSize="1.25rem" fontWeight={600}>
          0
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between">
        <Typography fontSize="1.25rem">Итого: </Typography>
        <Typography fontSize="1.25rem" fontWeight={600}>
          {totalPrice} {currency}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CheckoutInfo;
