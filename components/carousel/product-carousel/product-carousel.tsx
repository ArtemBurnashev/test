import { FC, useRef } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import React from 'react';
import Arrow from 'components/icons/inline-arrow';
import { ProductCard } from 'components/cards';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useAllProductsQuery, useCategoryLazyQuery, useCategoryQuery } from 'graphql/generated.graphql';
import { ProductCardLoading } from 'components/cards/loading-cards';

const Card = styled.div<{ height?: number; fullBorderRadius?: boolean }>`
  max-width: 100%;
`;

const NextArrow = styled(Arrow)`
  transform: rotate(180deg);
`;

interface ProductCarouselProps {
  label?: string;
  slug: string
}

const ProductCarousel: FC<ProductCarouselProps> = ({ label, slug }) => {
  const nextArrowRef = useRef<HTMLDivElement>(null);
  const prevArrowRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const { data, loading } = useCategoryQuery({
    variables: { first: 10, cursor: '', slug },
  });
  const [count, setCount] = React.useState(0)
  const settings = {
    beforeChange: (curent:any,next:any) => setCount(next),
  };
  console.log(count);

  const products = data?.category?.products?.edges.map(edge => edge.node)

  if (loading) {
    return (
      <Stack margin="1rem 0" flexWrap="wrap" direction="row" gap="2rem">
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
      </Stack>
    );
  }

  return (
    <Card>
      <Stack
        margin="1rem 0"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h2">{label}</Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={count === 0 ? { cursor: 'pointer',opacity:'0.5'} : { cursor: 'pointer'}}
            onClick={() => prevArrowRef.current && prevArrowRef.current.click()}
          >
            <Arrow />
          </Box>
          <Box
            sx={count === 4 ? { cursor: 'pointer',opacity:'0.5'} : { cursor: 'pointer'}}
            onClick={() => nextArrowRef.current && nextArrowRef.current.click()}
          >
            <NextArrow />
          </Box>
        </Stack>
      </Stack>
      <Slider
        {...settings}
        infinite={false}
        dots={false}
        arrows={true}
        slidesToScroll={3}
        initialSlide={0}
        autoplay={false}
        slidesToShow={6}
        prevArrow={<div ref={prevArrowRef} />}
        nextArrow={<div ref={nextArrowRef} />}
        lazyLoad="progressive"
        responsive={[
          {
            breakpoint: theme.breakpoints.values.md,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: theme.breakpoints.values.xs,
            settings: {
              slidesToShow: 1.5,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: theme.breakpoints.values.lg,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: theme.breakpoints.values.sm,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: theme.breakpoints.values.xl,
            settings: {
              slidesToShow: 6,
            },
          },
        ]}
      >
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            media={product?.media}
            thumbnail={product.thumbnail?.url}
            discount={product.defaultVariant?.pricing?.discount?.gross}
            slug={product.slug}
            id={product.id}
            startPrice={product.defaultVariant?.pricing?.price?.gross}
            variant={`${product?.defaultVariant?.attributes
              .map((val) => val?.attribute.name)
              .join(' ')}:${product?.defaultVariant?.name}`}
          />
        ))}
      </Slider>
    </Card>
  );
};

export default ProductCarousel;
