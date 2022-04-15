import { FC } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { CategoryCard } from 'components/cards';
import { useTheme } from '@mui/material';
import { useAllCategoriesQuery } from 'graphql/generated.graphql';
import { Paths } from 'config/site-paths';
import { useRouter } from 'next/router';

const Card = styled.div`
  max-width: 100%;
  overflow: hidden;
  margin: 2rem 0;
`;

const CategoryCarousel: FC = () => {
  const theme = useTheme();
  const { data } = useAllCategoriesQuery({
    variables: { first: 20, cursor: '' },
  });
  const router = useRouter();
  return (
    <Card>
      <Slider
        infinite
        dots={false}
        initialSlide={0}
        slidesToShow={5}
        arrows={false}
        slidesToScroll={3}
        autoplay={false}
        lazyLoad="progressive"
        responsive={[
          {
            breakpoint: 1517,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: theme.breakpoints.values.md,
            settings: {
              slidesToShow: 3,
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
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: theme.breakpoints.values.lg,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: theme.breakpoints.values.xl,
            settings: {
              slidesToShow: 5.5,
              slidesToScroll: 3,
            },
          },
        ]}
      >
        {data?.categories?.edges.map((item) => (
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
    </Card>
  );
};

export default CategoryCarousel;
