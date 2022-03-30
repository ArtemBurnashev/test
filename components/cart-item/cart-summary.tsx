import { Typography } from '@mui/material';
import { Button } from 'components/button';
import { Paths } from 'config/site-paths';
import { useRouter } from 'next/router';
import React from 'react';
import { useAppSelector } from 'redux-state/hook';
import { SummaryWrapper } from './cart-item.styles';

const CartSummary = () => {
  const { totalPrice, productsCount } = useAppSelector((state) => state.cart);
  const router = useRouter();

  return (
    <>
      <SummaryWrapper>
        <Typography variant="h2">В корзине</Typography>
        <Typography variant="subtitle2">Товаров: {productsCount}</Typography>
        <Button color="error">Введите промокод</Button>
        <Typography variant="subtitle1" fontWeight={600}>
          {totalPrice} Сум
        </Typography>
      </SummaryWrapper>
      <Button
        onClick={() => router.push(Paths.CHECKOUT)}
        variant="contained"
        fullWidth
      >
        Оформить заказ
      </Button>
    </>
  );
};
export default CartSummary;
