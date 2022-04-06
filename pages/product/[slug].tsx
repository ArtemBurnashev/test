// @ts-nocheck
import {
  Container,
  Grid,
  MenuItem,
  Rating,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import Spacer from 'components/common/spacer';
import Heart from 'components/icons/heart';
import colors from 'config/theme';
import { Main } from 'layouts/main';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DataLine from 'components/common/dataline';
import AddtoCardSingle from 'components/add-to-card/add-to-card-single';
import DataLineWithArrow from 'components/common/datalineWithArrow';
import { useRouter } from 'next/router';
import { useSingleProductQuery } from 'graphql/generated.graphql';
import SingleProductPageLoading from 'components/loading/single-product-page-loading';
import { LazyImage, ProductImage } from 'components/image';
import { ImageCarousel } from 'components/carousel/img-carousel';
import { Breadcrumb } from 'components/breadcrumbs';
import { Paths } from 'config/site-paths';
import Select from 'components/select';
import { DraftailEditor } from 'draftail';
import { SEO } from 'components/seo';

const SingleProduct: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [variant, setVariant] = useState();
  const { data, loading } = useSingleProductQuery({
    variables: { slug: Array.isArray(slug) ? slug[0] : slug || '' },
    skip: !slug,
  });
  const [open, setOpen] = React.useState(false);

  if (loading) return <SingleProductPageLoading />;

  const links = [
    {
      name: data?.product?.category?.name,
      link: `${Paths.CATEGORY_PRODUCTS}${data?.product?.category?.slug}`,
    },
    {
      name: data?.product?.name,
    },
  ];

  const handleChange = (event: SelectChangeEvent<any>) => {
    if (data?.product?.variants) {
      const varianttemp = data?.product?.variants.find(
        (product) => product.id === event.target.value
      );
      setVariant(varianttemp);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const getVariantName = () => {
    if(variant) {
      return `${variant.attributes
        .map((val) => val?.attribute.name)
        .join(' ')}:${variant.name}`;
    }
    return `${data?.product?.defaultVariant?.attributes
      .map((val) => val?.attribute.name)
      .join(' ')}:${data?.product?.defaultVariant?.name}`;
  }

  const description = {
    blocks: [
      {
        data: {
          text: 'Watch the slow setting sun of a wild summer evening sink into the horizon as you sip white wine that tastes like bittersweet memories of halcyon days.',
        },
        type: 'paragraph',
      },
    ],
  };

  return (
    <Main>
      <SEO
        title={`${data?.product.name} | GiperMart`}
        description={data?.product?.seoDescription}
        image={data?.product?.media?.length > 0 && data?.product?.media[0].url}
      />
      <Container maxWidth="xl">
        {data?.product?.name && <Breadcrumb data={links} />}

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
            {
              <Typography
                variant="subtitle2"
                sx={(theme) => ({
                  [theme.breakpoints.down('sm')]: {
                    display: 'none',
                  },
                })}
              >
                В избранное
              </Typography>
            }
          </Stack>
          <Typography color={colors.grey.default}>
            арт.{' '}
            <Typography color={colors.black} component="span">
              14979
            </Typography>
          </Typography>
        </Stack>
        <Spacer />
        <Grid margin="1rem 0" container>
          <Grid sm={12} xs={12} item md={7} lg={4}>
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
          <Grid item md={5} lg={5}>
            {data?.product?.variants?.length === 1 && variant && (
              <Typography variant="body1" fontWeight={500}>
                {variant.name}
              </Typography>
            )}
            {data?.product?.variants && data?.product?.variants?.length > 1 && (
              <>
                {
                  <Typography variant="body1" fontWeight={500}>
                    {data.product.defaultVariant?.attributes[0].attribute.name}
                  </Typography>
                }

                <Select
                  onOpen={handleClose}
                  onChange={handleChange}
                  onClose={handleOpen}
                  value={variant?.id}
                  endAdornment={<div />}
                  defaultValue={data.product.defaultVariant?.id}
                  sx={{
                    width: '6rem',
                    border: `1px solid ${colors.red.default}`,
                    ['div']: {
                      ['fieldset, svg']:
                        {
                          display: "none"
                        },
                    },
                  }}
                >
                  {data.product.variants.map((variant) => (
                    <MenuItem key={variant?.id} value={variant?.id}>
                      {variant?.name}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}

            <Stack spacing={2}>
              <Typography fontWeight={500} variant="h3">
                описание
              </Typography>
              {/* <Typography variant="body1">
                {data?.product?.seoDescription}
              </Typography> */}

              {console.log(data?.product?.description)}
              {!loading && (
                <DraftailEditor
                  readOnly={true}
                  rawContentState={description}
                />
              )}

              <Typography fontWeight={500} variant="h3">
                Характеристики
              </Typography>
              {data?.product?.attributes.map((attr) => (
                <DataLine
                  field={attr.attribute.name || ''}
                  value={attr.values.map((val) => val?.name).join(' ')}
                  key={attr.attribute.name}
                />
              ))}
            </Stack>
          </Grid>
          <Grid xs={12} sm={12} md={6} item lg={3}>
            <AddtoCardSingle
              price={
                variant?.pricing?.price?.gross ||
                data?.product?.defaultVariant?.pricing?.price?.gross
              }
              discount={
                variant?.pricing?.discount?.gross ||
                data?.product?.defaultVariant?.pricing?.discount?.gross
              }
              id={data?.product?.defaultVariant?.id || ''}
              image={
                (data?.product?.media && data?.product?.media[0].url) || ''
              }
              name={data?.product?.name || ''}
              variant={getVariantName()}
              slug={data?.product?.slug}
            />
          </Grid>
        </Grid>
        <Grid marginTop="2rem" marginBottom="2rem" container columnSpacing={4}>
          <Grid item xs={12}></Grid>
        </Grid>
      </Container>
    </Main>
  );
};

export default SingleProduct;
