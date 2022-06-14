import React from 'react';
import { NextPage } from 'next';
import { OrderTitle } from 'components/orders';
import { OrdersCard } from 'components/cards';
import { ProfileLayout } from 'layouts/profile';
import { Main } from 'layouts/main';
import { BackArrow } from 'components/icons/back-arrow';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { WithAuth } from 'components/private-route';
import { Paths } from 'config/site-paths';
import { Select, MenuItem, useMediaQuery } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { InfiniteLoader } from 'components/loaders/infinite-loader';
import { Container, Stack, Typography, Skeleton } from '@mui/material';
import { useOrdersQuery } from 'graphql/generated.graphql';
import { Breadcrumb } from 'components/breadcrumbs';

const orders: NextPage = () => {
  const [order, setOrder] = React.useState('order');

  const { data, loading, fetchMore } = useOrdersQuery({
    variables: {
      first: 10,
    },
  });
  const router = useRouter();
  const { t } = useTranslation();
  const links = [
    {
      name: 'Личный кабинет',
      link: Paths.PROFILE,
    },
    {
      name: 'Orders',
      link: Paths.ORDERS,
    },
  ];
  const md = useMediaQuery('(max-width:899px)');
  const orders = data?.me?.orders?.edges.map((edge) => edge.node);
  const pageInfor = data?.me?.orders?.pageInfo;

  const orderTypeChange = (item: SelectChangeEvent) => {
    console.log(item);

  }
  return (
    <Main>
      <Container maxWidth="xl">
        {!md && <Breadcrumb data={links} />}
        <ProfileLayout
          loading={loading}
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
          {!md ? (
            <Stack direction='row' mb='30px' alignItems='center' justifyContent='space-between'>
              <OrderTitle>Мои заказы</OrderTitle>
              <Select
                sx={{width:'300px'}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                placeholder='заказы'
                onChange={orderTypeChange}
              >
                <MenuItem selected value='order'>заказы</MenuItem>
                <MenuItem value='special'>Cпецзаказ</MenuItem>
                <MenuItem value='instalments'>Thirty</MenuItem>
              </Select>
            </Stack>
          ) : (
            <Stack
              onClick={() => router.back()}
              margin="16px 0"
              direction={'row'}
              gap="18px"
              alignItems="center"
            >
              <BackArrow />
              <Typography variant="h2">Мои заказы</Typography>
            </Stack>
          )}

          {orders?.length ? (
            <InfiniteLoader
              loadMore={() =>
                fetchMore({
                  variables: {
                    cursor: pageInfor?.endCursor,
                  },
                })
              }
              hasMore={pageInfor?.hasNextPage}
              loading={loading}
            >
              {orders.map((order) => (
                <OrdersCard key={order.id} order={order} />
              ))}
            </InfiniteLoader>
          ) : (
            <Typography sx={{ textAlign: 'center' }} variant="h2">
              {t('emty')}
            </Typography>

          )}
        </ProfileLayout>
      </Container>
    </Main>
  );
};

export default WithAuth(orders);
