import { Stack, Typography } from '@mui/material';
import { Button } from 'components/button';
import { CartController } from 'components/cart-item';
import React from 'react';
import Link from 'next/link';
import Cart from 'components/icons/cart';
import colors from 'config/theme';
import { addToCart } from 'redux-state/features/cart-slice';
import { useAppDispatch, useAppSelector } from 'redux-state/hook';
import formatter from 'utils/currencyFormatter';
import { AddToCardWrapper } from './add-to-card.styles';
import { Paths } from 'config/site-paths';

interface AddtoCardSingleProps {
  available: boolean | null;
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
  id?: string;
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
  available,
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
          price: discount || price,
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
            {formatter(price?.amountInSum)} {currency}
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
              {Math.floor(
                (discount.amountInSum / price?.amountInSum) * 100
              )}
              %
            </Typography>
          </Stack>
        </Stack>
      )}

      <Typography variant="h1" fontWeight={600}>
        {discount?.amountInSum && price?.amountInSum
          ? formatter(price?.amountInSum - discount?.amountInSum)
          : formatter(price?.amountInSum || 0)}
        {currency}
      </Typography>
      {available ? (
        <>
          {isInCard ? (
            <>
              <CartController id={id || ''} count={isInCard.count} />
              <Link href={Paths.CART}>
                <Button fullWidth endIcon={<Cart />} variant="contained">
                  ??????????????
                </Button>
              </Link>
            </>
          ) : (
            <Button onClick={handleAddToCart} fullWidth variant="contained">
              ?? ??????????????
            </Button>
          )}
        </>
      ) : (
        <Typography color={colors.primary.hover} variant="h2">
          ???????????????? ????????????????????
        </Typography>
      )}
    </AddToCardWrapper>
  );
};

export default AddtoCardSingle;
