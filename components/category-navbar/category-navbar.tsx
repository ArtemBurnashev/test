import React from 'react';
import { CategoryStyle } from './category-navbar-style';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { Paths } from 'config/site-paths';
import colors from 'config/theme';
import { useAllCategoriesQuery } from 'graphql/generated.graphql';
import Slider from 'react-slick';
import { Typography, Skeleton, Stack, } from '@mui/material';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from '@mui/material';
import truncate from 'utils/truncate';

export const CategoryNavbar: React.FC = () => {
  const router = useRouter()
  const { data, fetchMore, loading } = useAllCategoriesQuery({
    variables: { first: 8, cursor: '' },
  });
  const elements = data?.categories?.edges.map((item) => item.node)
    .map((links) => links);
   
  const linksItem = elements?.filter((item)=> {
    if(item.children?.edges.length){
      return item;
    }
  })
  
  const addElemets = (): void => {
    if (data?.categories?.pageInfo.hasNextPage) {
      fetchMore({ variables: { cursor: data?.categories?.pageInfo.endCursor } })
    }
  }
  const LinkSet = styled(Typography)`
    transition: all .4s ease;
    &:hover{
      a{
        color: ${colors.primary.hover};
      }
    }
  `
  
  
  const LinkText = styled(Link)`
    cursor: pointer;
  `

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: (loading ? 1 : 6),
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 969,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 611,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };
  const names = data?.categories?.edges.map((e)=> e.node.name).join(',')

  console.log(names);
  
  if (router.pathname !== Paths.HOME) {
    return (
      <CategoryStyle>
        <Container maxWidth="xl">
          {loading ?
            <Stack width='100%' spacing={8} direction='row' display="flex">
              <Skeleton variant="text" width="10%" />
              <Skeleton variant="text" width="10%" />
              <Skeleton variant="text" width="10%" />
            </Stack>
            :
            <Slider {...settings}>
              {linksItem?.map((links) =>
                <LinkSet
                  key={links.id}
                  sx={{ textAlign: 'center' }}
                  variant='subtitle2'
                >
                  <LinkText 
                    key={links.id} href={`${Paths.CATEGORY_PRODUCTS}${links.slug}`}>
                    {links.name.slice(0,20)+'...'}
                  </LinkText>
                </LinkSet>
              )}
              {data?.categories?.pageInfo.hasNextPage &&
                <Button
                  onClick={addElemets}
                  sx={{ padding: '0', width: 'max-content', color: '#333' }}
                  variant='text'
                >Еще</Button>
              }
            </Slider>
          }
        </Container>
      </CategoryStyle>
    )
  }
  return null;
}

