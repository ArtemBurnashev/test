import { Container, Grid, Skeleton, Typography } from '@mui/material';
import colors from 'config/theme';
import React from 'react';
import { useBannersQuery } from 'graphql/generated.graphql';
import styled from 'styled-components';
import { LazyImage } from 'components/image';
import Slider from 'react-slick';

const ActionWrapper = styled.div`

  margin: 32px  0;
  padding-top: 30px;
  padding-bottom: 30px;
  img {
    width: 100%;
    min-height: 100%;
    object-fit: contain;
  }
  .slick-list{
      margin-left: -20px;
      margin-right: -20px;
    }
    .slick-track{
      display: flex;
      gap: 20px;
    }
`;

const action = () => {

  const { data } = useBannersQuery({
    variables: {
      filter: {
        type: "DISCOUNT"
      },
      first: 3
    }
  })
  const discounts = data?.banners?.edges.map((el) => el.node);

  const settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 898,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 636,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const StyleImgBlock  = styled.div`
    min-height: 240px;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `
 

  return (
    <ActionWrapper>
      <Container maxWidth="xl">
        <Typography variant="h2" mb={1} fontWeight={600}>
          Акции
        </Typography>
        <Slider  lazyLoad="progressive" {...settings}>
          {discounts?.map((e) => (
            <StyleImgBlock key={e.id}>
              {e.backgroundImage ?
                <LazyImage src={e.backgroundImage?.url} alt={e.backgroundImage?.alt ? e.backgroundImage?.alt : 'actions'} />
                :
                ""
              }
            </StyleImgBlock>
          ))}
        </Slider>
      </Container>
    </ActionWrapper>
  );
};

export default action;

