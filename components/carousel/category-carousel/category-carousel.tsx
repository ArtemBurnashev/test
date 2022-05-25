import { FC } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { CategoryCard } from 'components/cards';
import { useTheme } from '@mui/material';
import { useAllCategoriesQuery } from 'graphql/generated.graphql';
import { Paths } from 'config/site-paths';
import { CategoryCaruselCard } from '../carusel-style';
import { useRouter } from 'next/router';


const CategoryCarousel: FC = () => {
  const theme = useTheme();
  const { data } = useAllCategoriesQuery({
    variables: { first: 20, cursor: '' },
  });
  const products = data?.categories?.edges.filter((e)=>{
    if(e.node.children?.edges.length){
      return e;
    }
  })
  
  const settings = {
    infinite: true,
    dots: false,
    slidesToShow: 5.5,
    arrows: false,
    speed: 500,
    slidesToScroll: 3,
    autoplay: true,
    responsive:[
      {
        breakpoint: 1517,
        settings: {
          slidesToShow: 5.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: theme.breakpoints.values.xs,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          infinite: false
        },
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 4.5,
          slidesToScroll: 2,
        },
      },
    ]
  }
  
  const router = useRouter();
  return (
    <CategoryCaruselCard>
      <Slider
        {...settings}
        lazyLoad="progressive" 
      >
        {products?.map((item) => (
          <div

            key={item.node.id}
          >
            <CategoryCard
              withMargin
              slug={item.node.slug}
              label={item.node.name}
              image={item.node?.backgroundImage}
            />
          </div>
        ))}
      </Slider>
    </CategoryCaruselCard>
  );
};

export default CategoryCarousel;
