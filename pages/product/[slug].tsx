import { Container, Grid, Rating, Stack, Typography } from '@mui/material';
import Spacer from 'components/common/spacer';
import Heart from 'components/icons/heart';
import colors from 'config/theme';
import { Main } from 'layouts/main';
import { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
import DataLine from 'components/common/dataline';
import AddtoCardSingle from 'components/add-to-card/add-to-card-single';
import DataLineWithArrow from 'components/common/datalineWithArrow';
import { useRouter } from 'next/router';
import { useSingleProductQuery } from 'graphql/generated.graphql';
import SingleProductPageLoading from 'components/loading/single-product-page-loading';
import { LazyImage, ProductImage } from 'components/image';
import { ImageCarousel } from 'components/carousel/img-carousel';

const SingleProduct: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, loading } = useSingleProductQuery({
    variables: { slug: Array.isArray(slug) ? slug[0] : slug || '' },
    skip: !slug,
  });

  if (loading) return <SingleProductPageLoading />;

  return (
    <Main>
      <Container maxWidth="xl">
        <Typography variant="h2" fontWeight={600} lineHeight="36px">
          {data?.product?.name}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          margin="1rem 0"
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Rating defaultValue={data?.product?.rating || 0} precision={0.5} />
            <Typography variant="subtitle2" color={colors.green.default}>
              ({data?.product?.rating || 0})
            </Typography>
            <Heart style={{ marginLeft: '3rem' }} />
            <Typography variant="subtitle2">В избранное</Typography>
          </Stack>
          <Typography color={colors.grey.default}>
            арт.{' '}
            <Typography color={colors.black} component="span">
              14979
            </Typography>
          </Typography>
        </Stack>
        <Spacer />
        <Grid margin="1rem 0" container columnSpacing={2}>
          <Grid item xs={4}>
            <ImageCarousel>
              {data?.product?.media?.map((media) => (
                <ProductImage key={media.alt}>
                  <LazyImage
                    src={media.url || ''}
                    alt={data?.product?.name || 'product image'}
                  />
                </ProductImage>
              ))}
            </ImageCarousel>
          </Grid>
          <Grid item xs={5}>
            {data?.product?.productType.hasVariants && (
              <>
                {' '}
                <Typography variant="body1" fontWeight={500}>
                  {data.product.defaultVariant?.attributes[0].attribute.name}
                </Typography>
                <Stack
                  sx={{
                    padding: '8px 15px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${colors.red.default}`,
                    maxWidth: '76px',
                    marginBottom: '1rem',
                  }}
                >
                  <Typography variant="body1">
                    {data.product.defaultVariant?.name}
                  </Typography>
                </Stack>
              </>
            )}

            <Stack spacing={2}>
              <Typography fontWeight={500} variant="h3">
                Характеристики
              </Typography>
              <Typography variant="body1">
                {data?.product?.seoDescription}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <AddtoCardSingle
              price={data?.product?.defaultVariant?.pricing?.price?.gross}
              discount={data?.product?.defaultVariant?.pricing?.discount?.gross}
              id={data?.product?.id || ''}
              image={
                (data?.product?.media && data?.product?.media[0].url) || ''
              }
              name={data?.product?.name || ''}
              variant={`${data?.product?.defaultVariant?.attributes[0].attribute.name}:${data?.product?.defaultVariant?.name}`}
              slug={data?.product?.slug}
            />
          </Grid>
        </Grid>
        <Grid marginTop="2rem" marginBottom="2rem" container columnSpacing={4}>
          {data?.product?.attributes.map((attr) => (
            <Grid item xs={6} key={attr.attribute.name}>
              <DataLineWithArrow
                field={attr.attribute.name || ''}
                value={attr.values.map((val) => val?.name).join(' ')}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Main>
  );
};

export default SingleProduct;
