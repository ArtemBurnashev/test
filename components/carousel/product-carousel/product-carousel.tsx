import { FC, useRef } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import React from 'react';
import Arrow from 'components/icons/inline-arrow';
import { ProductCard } from 'components/cards';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useAllProductsQuery, useCategoryLazyQuery, useCategoryQuery } from 'graphql/generated.graphql';
import { ProductCardLoading } from 'components/cards/loading-cards';
import arrow from 'assets/png/arrow.svg'

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  const Left = styled.div<{image:any}>`
    width: 24px;
    height: 24px;
    top: -30px;
    right: 0;
    position: absolute;
    
    .slick-next:before{
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      background-repeat: no-repeat;
      background-image: url(${(props) => props.image.src});
      background-size: 24px;
      background-position: center;
      
    }
    .slick-next{
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 100%;
      height: 100%;
    }
  `
  return (
    <Left style={{...style}} image={arrow} onClick={onClick} >
      <div  className={className} />
    </Left>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  const Right = styled.div<{image:any}>`
    width: 24px;
    height: 24px;
    position: absolute;
    top: -30px;
    right: 40px;
    z-index: 5;
    background-repeat: no-repeat;
    .slick-prev:before{
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      background-repeat: no-repeat;
      background-image: url(${(props) => props.image.src});
      background-size: 24px;
      background-position: center;
      transform: rotate(180deg);
    }
  
    .slick-prev{
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 100%;
      height: 100%;
    }
  `
  return (
    <Right style={{...style}}  image={arrow} onClick={onClick}>
      <div className={className} />
    </Right>

  );
}

const Card = styled.div<{ height?: number; fullBorderRadius?: boolean }>`
  max-width: 100%;
  position: relative;
`;


interface ProductCarouselProps {
  label?: string;
  slug: string
}

const ProductCarousel: FC<ProductCarouselProps> = ({ label, slug }) => {

  const theme = useTheme();
  const { data, loading } = useCategoryQuery({
    variables: { first: 10, cursor: '', slug },
  });


  const settings = {
    infinite: false,
    dots: false,
    arrows: true,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    slidesToShow: 6,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
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
    ]
  };


  const products = data?.category?.products?.edges.map(edge => edge.node);

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
      </Stack>
      <Slider
        lazyLoad="progressive"
        {...settings}
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
