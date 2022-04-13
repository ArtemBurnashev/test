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
import * as yup from 'yup';
import React, { useState } from 'react';
import Payme from 'assets/png/payme.png';
import Click from 'assets/png/click.png';
import { CheckoutInfo } from 'layouts/checkout';
import Link from 'next/link';
import { LinkButton } from 'components/common/link';
import { Paths } from 'config/site-paths';
import { useAppSelector } from 'redux-state/hook';
import {
  CountryCode,
  useCheckoutCompleteMutation,
  useCheckoutCreateMutation,
} from 'graphql/generated.graphql';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckoutCreateInput } from 'types/checkout.types';
import _ from 'lodash';

const checkoutCreateSchema = yup.object({
  name: yup.string().required('Name is required'),
  phone: yup
    .string()
    .matches(
      /(?:\+\998(9[012345789]|6[125679]|7[01234569])[0-9]{7})$/,
      'Phone number is invalid'
    )
    .required('Phone number required.'),
  streetAddress1: yup.string().required('address required'),
  streetAddress2: yup.string(),
});

const Checkout = () => {
  const { productsCount, cartProducts } = useAppSelector((state) => state.cart);
  const [checkoutCreate, { data: checkoutCreateData, loading }] =
    useCheckoutCreateMutation();
  const [checkoutComplete, { loading: checkoutCompleteLoading }] =
    useCheckoutCompleteMutation();
  const [isCreated, setIsCreated] = useState(false);

  const { control, handleSubmit } = useForm<CheckoutCreateInput>({
    resolver: yupResolver(checkoutCreateSchema),
  });

  const handleCheckout = (data: CheckoutCreateInput) => {
    const [firstName, lastName] = data.name.split(' ');
    const { phone, streetAddress1, streetAddress2 } = data;
    if (isCreated) {
      checkoutComplete({
        variables: {
          checkoutId: checkoutCreateData?.checkoutCreate?.checkout?.id,
        },
      });
      return;
    }
    checkoutCreate({
      variables: {
        input: {
          shippingAddress: {
            firstName,
            lastName,
            phone,
            streetAddress1,
            streetAddress2,
            country: CountryCode.Uz,
            city: streetAddress1,
          },
          billingAddress: {
            firstName,
            lastName,
            phone,
            streetAddress1,
            streetAddress2,
            country: CountryCode.Uz,
            city: streetAddress1,
          },
          phone,
          lines: cartProducts.map((product) => ({
            variantId: product.id || "",
            quantity: product.count,
          })),
          channel: 'default-channel',
        },
      },
      onCompleted: (data) => {
        if (data.checkoutCreate?.errors.length === 0) {
          setIsCreated(true);
        }
      },
    });
  };
  return (
    <Main pb={0}>
      <Container maxWidth="xl">
        {productsCount < 1 && productsCount ? (
          <Stack
            mt={2}
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
          <Grid alignItems="column-reverse" container columnSpacing={2}>
            <Grid
              mb={4}
              sx={{ paddingRight: '16px' }}
              item
              md={6}
              sm={12}
              lg={6}
            >
              <Typography margin="1.5rem 0" fontWeight={600} variant="h1">
                Оформление заказа
              </Typography>
              <form onSubmit={handleSubmit(handleCheckout)}>
                <Stack spacing={2} margin="1rem 0">
                  <Button
                    sx={{ maxWidth: 'max-content' }}
                    color="secondary"
                    size="small"
                    type="button"
                  >
                    Уже покупали у нас?
                  </Button>
                  <Typography variant="h2" fontSize={27}>
                    Контактные данные
                  </Typography>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field, formState: { errors } }) => (
                      <Input
                        label="Контактное лицо (ФИО)"
                        error={!!errors.name?.type}
                        helperText={errors.name?.message}
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="phone"
                    render={({ field, formState: { errors } }) => (
                      <Input
                        label="Контактный телефон"
                        error={!!errors.phone?.type}
                        helperText={errors.phone?.message}
                        {...field}
                      />
                    )}
                  />
                  <Typography variant="h2" fontSize={27}>
                    Доставка
                  </Typography>
                  <Controller
                    control={control}
                    name="streetAddress1"
                    render={({ field, formState: { errors } }) => (
                      <Input
                        label="Населенный пункт"
                        error={!!errors.streetAddress1?.type}
                        helperText={errors.streetAddress1?.message}
                        {...field}
                      />
                    )}
                  />
                  {/* <FormControl fullWidth>
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
                  </FormControl> */}
                  <Controller
                    control={control}
                    name="streetAddress2"
                    render={({ field, formState: { errors } }) => (
                      <Input
                        multiline
                        label="Комментарии к заказу"
                        error={!!errors.streetAddress2?.type}
                        helperText={errors.streetAddress2?.message}
                        {...field}
                      />
                    )}
                  />
                  {/* <Typography variant="h2" fontSize={27}>
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
                  </Stack> */}
                  <FormControl>
                    <RadioGroup defaultValue="1">
                      <Stack direction="row">
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
                        <CheckoutMethods>
                          <FormControlLabel
                            label=""
                            value="2"
                            control={<Radio />}
                          />
                          <Image layout="fixed" src={Payme} alt="payme" />
                        </CheckoutMethods>
                        {/* <CheckoutMethods>
                          <FormControlLabel
                            label=""
                            value="3"
                            control={<Radio />}
                          />
                          <Image layout="fixed" src={Click} alt="click" />
                        </CheckoutMethods> */}
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  <Button
                    loading={loading || checkoutCompleteLoading}
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    Подтвердить заказ
                  </Button>
                </Stack>
              </form>
            </Grid>
            <Grid
              sx={{ borderLeft: '1px solid #808080', paddingLeft: '16px' }}
              item
              lg={6}
              width="100%"
              sm={12}
              md={6}
            >
              <CheckoutInfo />
            </Grid>
          </Grid>
        )}
      </Container>
    </Main>
  );
};

export default Checkout;
