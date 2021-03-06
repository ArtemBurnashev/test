import { Container, Grid, Stack, Typography } from '@mui/material';
import { Button } from 'components/button';
import { CartItem, CartSummary } from 'components/cart-item';
import { LinkButton } from 'components/common/link';
import { Paths } from 'config/site-paths';
import { Main } from 'layouts/main';
import { NextPage } from 'next';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'redux-state/hook';

const Cart: NextPage = () => {
  const { t } = useTranslation();
  const { cartProducts = [], productsCount } = useAppSelector((state) => state.cart);

  return (
    <Main>
      <Container sx={{ height: '100%' }} maxWidth="xl">
        <Typography mt={2} variant="h2">{t('cart')}</Typography>
        
        <Grid container >
          <Grid paddingRight="1rem" xs={12} sm={12} md={8} item lg={9}>
            {cartProducts.map((products) => (
              <CartItem key={products.id} {...products} />
            ))}
          </Grid>
          {!productsCount ? ""
            :
            <Grid xs={12} sm={12} md={4} item lg={3}>
              <CartSummary />
            </Grid>
          }

        </Grid>
        {!productsCount ?
          <Stack spacing={2} justifyContent="center" alignItems="center" height="50vh">
            <Typography variant="h2">Your cart is empty</Typography>
            <Link href={Paths.HOME}>
              <LinkButton>Fill it</LinkButton>
            </Link>
          </Stack>
          :
          ""
        }



      </Container>
    </Main>
  );
};

export default Cart;
