import React from 'react';
import { NextPage } from 'next';
import { OrderTitle } from 'components/orders';
import { OrdersCard } from 'components/cards';
import { ProfileLayout } from 'layouts/profile';
import { Main } from 'layouts/main';
import { BackArrow } from 'components/icons/back-arrow';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Paths } from 'config/site-paths';
import { useMediaQuery } from '@mui/material';
import { InfiniteLoader } from 'components/loaders/infinite-loader';
import { Container, Stack, Typography, Skeleton } from '@mui/material';
import { useOrdersQuery } from 'graphql/generated.graphql';
import { Breadcrumb } from 'components/breadcrumbs';

const orders: NextPage = () => {
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
            <OrderTitle>Мои заказы</OrderTitle>
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

export default orders;
