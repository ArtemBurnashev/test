import { Container, Grid, Skeleton, Stack, Typography, IconButton } from '@mui/material';
import { ProductCard } from 'components/cards';
import { ProductCardLoading } from 'components/cards/loading-cards';
import { InfiniteLoader } from 'components/loaders/infinite-loader';
import { SEO } from 'components/seo';
import {
  OrderDirection,
  ProductOrderField,
  useCategoryQuery,
} from 'graphql/generated.graphql';
import Filter from 'layouts/filter';
import { useScrollPositsion } from 'hooks/use-scroll-positsion';
import { Main } from 'layouts/main';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Arrow from 'components/icons/arrow';
import React from 'react';
import { useAppSelector } from 'redux-state/hook';

const btnTopStyle = {
  position: 'fixed',
  zIndex: '99',
  bottom: '30px',
  left: '30px',
  transform: 'rotate(90deg)',
  bgcolor: 'rgba(0,0,0,0.08)',
  ':hover': { bgcolor: 'rgba(0,0,0,0.04)' }
}

const CategoryProducts: NextPage = () => {
  const router = useRouter();
  const { price, sort, attributes } = useAppSelector((state) => state.filter);
  const { scrollPosition } = useScrollPositsion()

  const { slug } = router.query;
  const { data, loading, fetchMore } = useCategoryQuery({
    variables: {
      first: 10,
      slug: Array.isArray(slug) ? slug[0] : slug || '',
      cursor: '',
      filter: {
        price: {
          lte: price.lte,
          gte: price.gte,
        },
        attributes,
      },
      sort: {
        direction: sort?.direction || OrderDirection.Asc,
        field: ProductOrderField.Price,
      },
    },
    skip: !slug,
  });


  const nodes = data?.category?.products?.edges.map((edge) => edge.node);
  const pageInfo = data?.category?.products?.pageInfo;

  const loadingIndicator = () => (
    <Stack spacing={2}>
      <Skeleton variant="text" height={50} width={250} />
      <Stack direction="row" flexWrap="wrap" gap="2rem">
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
      </Stack>
    </Stack>
  );
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <Main>
      {data?.category?.name && (
        <SEO
          title={`${data?.category?.name} | GiperMart`}
          description={data?.category?.name}
        />
      )}

      <Container maxWidth="xl">
        <Filter>
          {loading ? (
            loadingIndicator()
          ) : (
            <Stack spacing={2}>
              <Typography margin="1.5rem 0" mt={{ xs: '34px', md: '11px' }} variant="h2">
                {data?.category?.name}
              </Typography>
              <InfiniteLoader
                hasMore={pageInfo?.hasNextPage || false}
                loadMore={() =>
                  fetchMore({
                    variables: {
                      cursor: pageInfo?.endCursor,
                    },
                  })
                }
                loading={loading}
              >
                <Grid rowGap="3rem" direction="row" container>
                  {nodes && nodes.length > 0 ? (
                    nodes?.map((product) => (
                      <Grid item xs={12} md={4} lg={3} sm={6} key={product.id}>
                        <ProductCard
                          infoProduct={product.isAvailableForPurchase || null}
                          name={product.name}
                          media={product?.media}
                          thumbnail={product.thumbnail?.url}
                          discount={
                            product.defaultVariant?.pricing?.discount?.gross
                          }
                          slug={product.slug}
                          startPrice={
                            product.defaultVariant?.pricing?.price?.gross
                          }
                          id={product.defaultVariant?.id}
                          variant={`${product?.defaultVariant?.attributes
                            .map((val) => val?.attribute.name)
                            .join(' ')}:${product?.defaultVariant?.name}`}
                        />
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography
                        textAlign="center"
                        margin="1.5rem 0"
                        variant="h2"
                      >
                        ???????????? ???? ??????????????
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </InfiniteLoader>
            </Stack>
          )}
        </Filter>
        {scrollPosition > 600 &&
          <IconButton onClick={goToTop} sx={{ ...btnTopStyle }}>
            <Arrow />
          </IconButton>
        }

      </Container>
    </Main>
  );
};

export default CategoryProducts;
