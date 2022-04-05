import { NextPage } from 'next'
import React from 'react'
import { ProfileLayout } from 'layouts/profile';
import { Container, Typography, Stack, Skeleton, Dialog, Grid, Backdrop, CircularProgress } from '@mui/material';
import { Paths } from 'config/site-paths';
import { Breadcrumb } from 'components/breadcrumbs';
import { Main } from 'layouts/main';
import { useAddressListQuery } from 'graphql/generated.graphql';
import { AddressCreate, AddressUpdate } from 'components/address-items';
import { Button } from 'components/button';
import { useModal } from 'hooks/use-modal';
import Close from 'components/icons/close';
import { AddresCard } from 'components/cards';



const Addresses: NextPage = () => {
  const { data, loading, refetch } = useAddressListQuery()
  const { close, open, isOpen } = useModal();
  const backdrop = useModal()
  console.log(refetch);

  const links = [
    {
      name: 'Личный кабинет',
      link: Paths.PROFILE,
    },
    {
      name: 'Address',
      link: Paths.ORDERS,
    }
  ]
  return (
    <Main>
      <Container maxWidth="xl">
        <Breadcrumb data={links} />
        <ProfileLayout
          loading={false}
          loadingFallBack={
            <Stack gap="1rem">
              <Typography variant="h2">
                <Skeleton variant="text" width="40%" />
              </Typography>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="50%" />
            </Stack>
          }
        >
          <Stack mb={4} direction='row' alignItems='center' justifyContent='space-between'>
            <Typography variant='h2'>Address</Typography>
            <Button onClick={open} variant='contained'>Create Address</Button>
          </Stack>
          <Grid container spacing={2}>
            {data?.me?.addresses?.map((e) => (
              <AddresCard data={e} backdrop={backdrop} />
            ))}
          </Grid>
        </ProfileLayout>
        <Dialog
          open={isOpen}
          onClose={close}
        >
          <Close
            style={{
              right: '10px',
              top: '10px',
              cursor: 'pointer',
              position: 'absolute',
            }}
            onClick={close}
          />
          <AddressCreate backdrop={backdrop} modalClose={close} />

        </Dialog>
        <Backdrop open={backdrop.isOpen}>
          <CircularProgress color='primary' />
        </Backdrop>
      </Container>
    </Main>
  )
}

export default Addresses;