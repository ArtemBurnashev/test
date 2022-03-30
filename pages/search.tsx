import { Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { ProductCard } from 'components/cards';
import { ProductCardLoading } from 'components/cards/loading-cards';
import { InfiniteLoader } from 'components/loaders/infinite-loader';
import {
  useAllProductsQuery,
  useCategoryQuery,
} from 'graphql/generated.graphql';
import { Main } from 'layouts/main';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const CategoryProducts: NextPage = () => {
  const router = useRouter();
  const { query } = router.query;

  const { data, loading, fetchMore } = useAllProductsQuery({
    variables: {
      first: 10,
      search: Array.isArray(query) ? query.join('&') : query || '',
      cursor: '',
    },
  });

  const nodes = data?.products?.edges.map((edge) => edge.node);
  const pageInfo = data?.products?.pageInfo;

  const loadingIndicator = () => (
    <Stack spacing={2}>
      <Skeleton variant="text" height={50} width={250} />
      <Stack direction="row" spacing={2}>
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
      </Stack>
    </Stack>
  );

  return (
    <Main>
      <Container maxWidth="xl">
        {loading ? (
          loadingIndicator()
        ) : (
          <Stack spacing={2}>
            <Typography variant="h2">
              "{query}" so'rovi bo'yicha qidiruv natijalari
            </Typography>
            <InfiniteLoader
              hasMore={pageInfo?.hasNextPage}
              loadMore={() =>
                fetchMore({
                  variables: {
                    cursor: pageInfo?.endCursor,
                  },
                })
              }
              loading={loading}
            >
              <Grid rowGap="3rem" direction="row" container spacing={2}>
                {nodes && nodes?.length > 0 ? (
                  nodes?.map((product) => (
                    <Grid item xs={12} md={3} lg={2} sm={6} key={product.id}>
                      <ProductCard
                        name={product.name}
                        media={product?.media}
                        thumbnail={product.thumbnail?.url}
                        discount={product.pricing?.discount?.gross}
                        slug={product.slug}
                        id={product.id}
                      />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography textAlign="center" variant="h2">
                      Hech narsa topilmadi
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </InfiniteLoader>
          </Stack>
        )}
      </Container>
    </Main>
  );
};

export default CategoryProducts;
