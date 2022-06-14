import React from 'react';
import { NextPage } from 'next';
import { OrderTitle } from 'components/orders';
import { OrdersCard } from 'components/cards';
import { ProfileLayout } from 'layouts/profile';
import { Main } from 'layouts/main';
import { BackArrow } from 'components/icons/back-arrow';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useGetSpecialOrderQuery } from 'graphql/generated.graphql';
import { WithAuth } from 'components/private-route';
import { Paths } from 'config/site-paths';
import { SpecialOrderCard } from 'components/cards/special-order-card';
import { Select, MenuItem, useMediaQuery } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { InfiniteLoader } from 'components/loaders/infinite-loader';
import { Container, Stack, Typography, Skeleton, Tabs, Tab, Box } from '@mui/material';
import { useOrdersQuery } from 'graphql/generated.graphql';
import { Breadcrumb } from 'components/breadcrumbs';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


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
  const specialOrderID = localStorage.getItem('specialOrderID')
  const { data: specialData, loading: specialLoding } = useGetSpecialOrderQuery({
    variables: {
      id: specialOrderID ? specialOrderID : undefined
    }
  })
  const specials = specialData?.specialOrderByUserId

 
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
            // <OrderTitle>Мои заказы</OrderTitle>
            ""
          ) : (
            <>
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

            </>

          )}
          <Tabs sx={{ marginBottom: '20px' }} value={value} onChange={handleChangeTab} aria-label="basic tabs example">
            <Tab label="заказы" {...a11yProps(0)} />
            <Tab label="Cпецзаказ" {...a11yProps(1)} />
            <Tab label="рассрочки " {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
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
          </TabPanel>
          <TabPanel value={value} index={1}>
            {specials?.map((item) => (
              <>
                {item ?
                  <SpecialOrderCard
                    orderUrl={item?.url}
                    status={item?.status}
                    userName={item?.user?.firstName ? item?.user?.firstName : ''}
                  />
                  :
                  ""
                }

              </>

            ))}
          </TabPanel>
          <TabPanel value={value} index={2}>

          </TabPanel>
        </ProfileLayout>
      </Container>
    </Main>
  );
};

export default WithAuth(orders);
