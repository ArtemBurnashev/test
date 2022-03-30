import {
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { Button } from 'components/button';
import { CheckoutMethods } from 'components/checkout';
import Input from 'components/input';
import Radio from 'components/radio';
import { Main } from 'layouts/main';
import Image from 'next/image';
import React from 'react';
import Payme from 'assets/png/payme.png';
import Click from 'assets/png/click.png';
import { CheckoutInfo } from 'layouts/checkout';
import Link from 'next/link';
import { LinkButton } from 'components/common/link';
import { Paths } from 'config/site-paths';
import { useAppSelector } from 'redux-state/hook';

const Checkout = () => {
  const productsCount = useAppSelector((state) => state.cart.productsCount);
  return (
    <Main>
      <Container maxWidth="xl">
        {productsCount < 1 ? (
          <Stack
            spacing={2}
            justifyContent="center"
            alignItems="center"
            height="50vh"
          >
            <Typography variant="h2">Your cart is empty</Typography>
            <Link href={Paths.HOME}>
              <LinkButton>Fill it</LinkButton>
            </Link>
          </Stack>
        ) : (
          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <Typography fontWeight={600} variant="h1">
                Оформление заказа
              </Typography>
              <Stack spacing={2} margin="1rem 0">
                <Button
                  sx={{ maxWidth: 'max-content' }}
                  color="secondary"
                  size="small"
                >
                  Уже покупали у нас?
                </Button>
                <Typography variant="h2" fontSize={27}>
                  Контактные данные
                </Typography>
                <Input label="Контактное лицо (ФИО)" />
                <Input label="Контактный телефон" />
                <Typography variant="h2" fontSize={27}>
                  Доставка
                </Typography>
                <Input label="Населенный пункт" />
                <FormControl fullWidth>
                  <RadioGroup defaultValue="1">
                    <Stack
                      direction="row"
                      alignItems="center"
                      width="100%"
                      justifyContent="space-between"
                      marginBottom="2rem"
                    >
                      <Stack direction="row" alignItems="center">
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label=""
                        />
                        <Stack>
                          <Typography variant="h3" fontSize="1.25rem">
                            Самовывоз
                          </Typography>
                          <Typography variant="body2">
                            На пункте выдачи
                          </Typography>
                        </Stack>
                      </Stack>
                      <Typography fontSize={21}>+ 0 Сум</Typography>
                    </Stack>
                    <Stack
                      width="100%"
                      justifyContent="space-between"
                      direction="row"
                      alignItems="center"
                    >
                      <Stack direction="row" alignItems="center">
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label=""
                        />
                        <Stack>
                          <Typography variant="h3" fontSize="1.25rem">
                            Курьером
                          </Typography>
                          <Typography variant="body2">
                            Доставка курьером
                          </Typography>
                        </Stack>
                      </Stack>
                      <Typography fontSize={21}>+ 300 Сум</Typography>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                <Input multiline label="Комментарии к заказу" />
                <Typography variant="h2" fontSize={27}>
                  Покупатель
                </Typography>
                <Input label="Email" />
                <Stack direction="row">
                  <Checkbox color="secondary" />
                  <Stack>
                    <Typography variant="h3" fontSize="1.25rem">
                      Стать постоянным покупателем
                    </Typography>
                    <Typography variant="body2">
                      Вы сможете видеть историю заказов, проще делать новые и
                      получать скидки
                    </Typography>
                  </Stack>
                </Stack>
                <FormControl>
                  <RadioGroup defaultValue="1">
                    <CheckoutMethods>
                      <FormControlLabel
                        label=""
                        value="1"
                        control={<Radio />}
                      />
                      <Stack>
                        <Typography variant="h3" fontSize="1.25rem">
                          Наличными курьеру
                        </Typography>
                        <Typography variant="body2">
                          Наличными курьеру
                        </Typography>
                      </Stack>
                    </CheckoutMethods>
                    <Stack direction="row">
                      <CheckoutMethods>
                        <FormControlLabel
                          label=""
                          value="2"
                          control={<Radio />}
                        />
                        <Image layout="fixed" src={Payme} alt="payme" />
                      </CheckoutMethods>
                      <CheckoutMethods>
                        <FormControlLabel
                          label=""
                          value="3"
                          control={<Radio />}
                        />
                        <Image layout="fixed" src={Click} alt="click" />
                      </CheckoutMethods>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                <Button variant="contained" fullWidth>
                  Подтвердить заказ
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <CheckoutInfo />
            </Grid>
          </Grid>
        )}
      </Container>
    </Main>
  );
};

export default Checkout;
