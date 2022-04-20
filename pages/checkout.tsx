import {
  Checkbox,
  Container,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Modal,
  Paper,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { Button } from 'components/button';
import { CheckoutMethods,CheckoutStackBlock } from 'components/checkout';
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
import { useAppSelector, useAppDispatch } from 'redux-state/hook';
import { toggle } from 'redux-state/features/sidebar';
import {
  CountryCode,
  useAddressListQuery,
  useCheckoutCompleteMutation,
  useCheckoutCreateMutation,
  usePaymeTransactionMutation,
} from 'graphql/generated.graphql';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckoutCreateInput } from 'types/checkout.types';
import _ from 'lodash';
import { AddresCard } from 'components/cards';
import { useModal } from 'hooks/use-modal';
import { Address } from 'components/cards/address-card';
import colors from 'config/theme';
import { clearCart } from 'redux-state/features/cart-slice';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

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

const Checkout:NextPage = () => {
  const { productsCount, cartProducts, totalPrice } = useAppSelector(
    (state) => state.cart
  );
  const [paymentGateway, setPaymentGateway] = useState('1');
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const [selectedAddres, setSelectedAddress] = useState('');
  const [checkoutCreate, { data: checkoutCreateData, loading }] =
    useCheckoutCreateMutation();
  const [
    checkoutComplete,
    { data: checkoutCompleteData, loading: checkoutCompleteLoading },
  ] = useCheckoutCompleteMutation();
  const [paymeTransaction, { data: paymeData, loading: paymeLoading }] =
    usePaymeTransactionMutation();
  const router = useRouter();
  const completeModal = useModal();
  const [isCreated, setIsCreated] = useState(false);
  const { data: addresses } = useAddressListQuery({ skip: !isAuthenticated });

  const { control, handleSubmit, setValue } = useForm<CheckoutCreateInput>({
    resolver: yupResolver(checkoutCreateSchema),
  });
  const dispatch = useAppDispatch();
  const modalControl = useModal();

  const handleAddressSelect = (address: Address | null) => {
    if (!address) return;
    setSelectedAddress((oldValue) =>
      oldValue === address.id ? '' : address.id
    );
    if (selectedAddres !== address.id) {
      setValue('name', `${address.firstName} ${address.lastName}`);
      setValue('phone', address.phone || '');
      setValue('streetAddress1', address.streetAddress1);
    }
  };

  const handleCheckout = (data: CheckoutCreateInput) => {
    const [firstName, lastName] = data.name.split(' ');
    const { phone, streetAddress1, streetAddress2 } = data;
    if (isCreated) {
      checkoutComplete({
        variables: {
          checkoutId: checkoutCreateData?.checkoutCreate?.checkout?.id,
          paymentGateway:
            paymentGateway === '2' ? 'mirumee.payments.payme' : undefined,
        },
        onCompleted: (data) => {
          if (data.checkoutComplete?.errors.length === 0) {
            dispatch(clearCart());
            completeModal.open();
          }
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
            variantId: product.id || '',
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

  const handlePayment = () => {
    if (!checkoutCompleteData?.checkoutComplete?.payment) return;
    paymeTransaction({
      variables: {
        input: {
          paymentId: checkoutCompleteData?.checkoutComplete?.payment.id,
          returnUrl: router.basePath,
        },
      },
      onCompleted: (res) => {
        if (
          res.paymeTransactionCreate?.errors.length === 0 &&
          res.paymeTransactionCreate.url
        ) {
          window.open(res.paymeTransactionCreate?.url);
        }
      },
    });
  };
  const [envButton,setEnvButton] = React.useState(false);
  const changeButton = (e:any) => {
    setEnvButton(e.target.checked);
  }
  return (
    <Main pb={0}>
      <Container maxWidth="xl">
        <Dialog open={completeModal.isOpen}>
          <Paper sx={{ borderRadius: 0, padding: '40px' }}>
            <Stack sx={{ gap: '1rem' }}>
              <Typography variant="h2">
                Заказ №:{' '}
                <Typography component="span" variant="h2" fontWeight={300}>
                  {checkoutCompleteData?.checkoutComplete?.order?.number}
                </Typography>{' '}
                оформлен
              </Typography>
              <Typography variant="subtitle2">
                Отслеживать статус заказа можно в личном кабинете
              </Typography>
              <Stack justifyContent="space-between" direction="row">
                {paymentGateway !== '1' && (
                  <Button
                    loading={paymeLoading}
                    onClick={handlePayment}
                    variant="contained"
                  >
                    ОПЛАТИТЬ
                  </Button>
                )}
                <Button
                  onClick={() => router.push(Paths.HOME)}
                  variant="text"
                  sx={{ color: colors.black }}
                >
                  ПРОДОЛЖИТЬ ПОКУПКИ
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Dialog>
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
          <CheckoutStackBlock direction={'row'}>
            <Stack paddingRight={{md:'16px'}} width={{md:'50%'}}>
              <Typography margin="1.5rem 0" fontWeight={600} variant="h1">
                Оформление заказа
              </Typography>
              <form onSubmit={handleSubmit(handleCheckout)}>
                <Stack spacing={2} margin="1rem 0">
                  {!isAuthenticated && (
                    <Button
                      sx={{ maxWidth: 'max-content' }}
                      color="secondary"
                      size="small"
                      type="button"
                      onClick={() => dispatch(toggle(true))}
                    >
                      Уже покупали у нас?
                    </Button>
                  )}

                  {addresses?.me?.addresses?.map((address) => (
                    <AddresCard
                      onClick={() => handleAddressSelect(address)}
                      isActive={selectedAddres === address?.id}
                      isCheckoutPage
                      data={address}
                      backdrop={modalControl}
                    />
                  ))}

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
                        label="Адрес"
                        error={!!errors.streetAddress1?.type}
                        helperText={errors.streetAddress1?.message}
                        {...field}
                      />
                    )}
                  />
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
                  <FormControl>
                    <RadioGroup
                      onChange={(_, value) => setPaymentGateway(value)}
                      defaultValue="1"
                    >
                      <Stack direction="row" gap="1rem">
                        <CheckoutMethods>
                          <FormControlLabel
                            label={
                              <Stack padding="1rem 1.5rem">
                                <Stack>
                                  <Typography variant="h3" fontSize="1.25rem">
                                    Наличными курьеру
                                  </Typography>
                                  <Typography variant="body2">
                                    Наличными курьеру
                                  </Typography>
                                </Stack>
                              </Stack>
                              
                            }
                            value="1"
                            control={<Radio sx={{ marginLeft: '1rem' }} />}
                          />
                        </CheckoutMethods>
                        <CheckoutMethods>
                          <FormControlLabel
                            label={
                              <Stack padding="1rem 1.5rem">
                                <Image layout="fixed" src={Payme} alt="payme" />
                              </Stack>
                            }
                            value="2"
                            control={<Radio sx={{ marginLeft: '1rem' }} />}
                          />
                        </CheckoutMethods>
                      </Stack>
                      <FormControlLabel sx={{mt:'10px'}} control={<Checkbox onChange={changeButton}/>} label='Подтвердить'/>
                    </RadioGroup>
                     
                  </FormControl>
                  <Button
                    disabled={!envButton}
                    loading={loading || checkoutCompleteLoading}
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    Подтвердить заказ
                  </Button>
                </Stack>
              </form>
            </Stack>
            <Stack
              borderLeft={{md:'1px solid #808080'}}
              paddingLeft={{md:'16px'}}
              width={{md:'50%'}}
            >
              <CheckoutInfo />
            </Stack>
          </CheckoutStackBlock>
        )}
      </Container>
    </Main>
  );
};

export default Checkout;
