import { Stack, Typography } from '@mui/material';
import { Button } from 'components/button';
import { CartController } from 'components/cart-item';
import colors from 'config/theme';
import React from 'react';
import { addToCart } from 'redux-state/features/cart/cart-slice';
import { useAppDispatch, useAppSelector } from 'redux-state/hook';
import { AddToCardWrapper } from './add-to-card.styles';

interface AddtoCardSingleProps {
  price?: {
    amount: number;
    currency: string;
    amountInSum?: number | null;
  };
  discount?: {
    amount: number;
    currency: string;
    amountInSum?: number | null;
  };
  id: string;
  name: string;
  image: string;
  variant: string;
  slug?: string;
}

const AddtoCardSingle: React.FC<AddtoCardSingleProps> = ({
  price,
  discount,
  id,
  name,
  image,
  variant,
  slug,
}) => {
  const { cartProducts, currency } = useAppSelector((state) => state.cart);
  const isInCard = cartProducts.find((product) => product.id === id);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (price?.amountInSum) {
      dispatch(
        addToCart({
          id,
          name,
          is_saved: false,
          image,
          price:  discount || price,
          variant,
          slug,
        })
      );
    }
  };
  return (
    <AddToCardWrapper>
      {discount?.amountInSum && price?.amountInSum && (
        <Stack direction="row" justifyContent="space-between">
          <Typography
            sx={{ textDecoration: 'line-through' }}
            fontSize="1.25rem"
            color={colors.grey.default}
          >
            {price?.amountInSum} {currency}
          </Typography>
          <Stack
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: '.3rem',
              backgroundColor: colors.red.default,
            }}
          >
            <Typography variant="h3" sx={{ color: colors.white }}>
              {discount.amountInSum !== price?.amountInSum && '-'}
              {Math.floor(100 - (discount?.amountInSum / price?.amountInSum) * 100)}%
            </Typography>
          </Stack>
        </Stack>
      )}

      <Typography variant="h1" fontWeight={600}>
        {discount ? discount.amountInSum : price?.amountInSum}{' '}
        {currency}
      </Typography>
      {isInCard ? (
        <CartController id={id || ''} count={isInCard.count} />
      ) : (
        <Button onClick={handleAddToCart} fullWidth variant="contained">
          В корзину
        </Button>
      )}
    </AddToCardWrapper>
  );
};

export default AddtoCardSingle;
