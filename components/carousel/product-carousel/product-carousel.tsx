import { FC, useRef } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import Arrow from 'components/icons/inline-arrow';
import { ProductCard } from 'components/cards';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useAllProductsQuery } from 'graphql/generated.graphql';
import { ProductCardLoading } from 'components/cards/loading-cards';

const Card = styled.div<{ height?: number; fullBorderRadius?: boolean }>`
  max-width: 100%;
`;

const NextArrow = styled(Arrow)`
  transform: rotate(180deg);
`;

interface ProductCarouselProps {
  label?: string;
}

const ProductCarousel: FC<ProductCarouselProps> = ({ label }) => {
  const nextArrowRef = useRef<HTMLDivElement>(null);
  const prevArrowRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const { data, loading } = useAllProductsQuery({
    variables: { first: 10, search: '', cursor: '' },
  });

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
            sx={{ cursor: 'pointer' }}
            onClick={() => prevArrowRef.current && prevArrowRef.current.click()}
          >
            <Arrow />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => nextArrowRef.current && nextArrowRef.current.click()}
          >
            <NextArrow />
          </Box>
        </Stack>
      </Stack>
      <Slider
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
        {data?.products?.edges.map((product) => (
          <ProductCard
            key={product.node.id}
            name={product.node.name}
            media={product.node?.media}
            thumbnail={product.node.thumbnail?.url}
            discount={product.node.defaultVariant?.pricing?.discount?.gross}
            slug={product.node.slug}
            id={product.node.defaultVariant?.id}
            startPrice={product.node.defaultVariant?.pricing?.price?.gross}
          />
        ))}
      </Slider>
    </Card>
  );
};

export default ProductCarousel;
