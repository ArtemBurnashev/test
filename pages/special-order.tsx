import React from 'react';
import { WithAuth } from 'components/private-route';
import { Button, Container, Stack, Typography, useMediaQuery } from '@mui/material';
import brand1 from 'assets/brends/brand1.png';
import brand2 from 'assets/brends/brand2.png';
import brand3 from 'assets/brends/brand3.png';
import Image from 'next/image';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import Input from 'components/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { Breadcrumb } from 'components/breadcrumbs';
import { useSpecialOrderMutation } from 'graphql/generated.graphql';
import { Main } from 'layouts/main';
import { NextPage } from 'next';


const specialrder: NextPage = () => {
  const md = useMediaQuery('(max-width:899px)');
  const validationSchema = Yup.object().shape({
    url: Yup.string().url()
      .required('url is required'),
    address: Yup.string()
      .required('Address is required'),

  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;
  const [orderCreate] = useSpecialOrderMutation()
  const onSubmit = (item: any) => {
    orderCreate(
      {
        variables: {
          url: item.url
        },
        onCompleted(data) {
          reset()
          if (localStorage.getItem('specialOrderID')) {
            return;
          }
          localStorage.setItem('specialOrderID',
            data.specialOrderCreate?.user?.id ?
              data.specialOrderCreate?.user?.id : ''
          )
        },
      })

  }
  const links = [
    {
      name: 'Товар из Америки',
    },

  ]

  return (
    <Main>
      <Container maxWidth='xl'>
        {!md && <Breadcrumb data={links} />}
        <Typography mt='8px' mb='23px' variant='h2'>Популярные бренды</Typography>
        <Stack direction='row'>
          <Stack>
            <a href="https://www.walmart.com/" target='_blank'>
              <Image src={brand1} alt='brand' />
            </a>
          </Stack>
          <Stack>
            <a href="https://www.ebay.com/" target='_blank'>
              <Image src={brand2} alt='brand' />
            </a>
          </Stack>
          <Stack>
            <a href="https://www.amazon.com/" target='_blank'>
              <Image src={brand3} alt='brand' />
            </a>
          </Stack>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '664px' }}>
          <Typography>Адресс доставки</Typography>
          <Input
            fullWidth
            type='text'
            {...register('address')}
            error={!!errors.address?.type}
            helperText={errors.address?.message}
          />
          <Typography mt='32px'>Ссылка на Товар <span style={{ color: '#33333366' }}>(на бренд, увиденную на других сайтах)</span></Typography>
          <Input
            fullWidth
            type='text'
            {...register('url')}
            error={!!errors.url?.type}
            helperText={errors.url?.message}
          />
          <Stack justifyContent='end' mb='60px' mt='28px' direction='row'>
            <Button type='submit' variant='contained'>Заказaть</Button>
          </Stack>
        </form>
      </Container>
    </Main>
  )
}

export default WithAuth(specialrder);