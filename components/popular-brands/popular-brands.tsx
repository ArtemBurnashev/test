import React from 'react';
import { BrandWrapper } from './brands.styles';
import { Skeleton } from '@mui/material';
import Image from 'next/image';
import { useBannersQuery } from 'graphql/generated.graphql';
import { Stack } from '@mui/material';
import { LazyImage } from 'components/image';


const PopularBrands = () => {
  const { data } = useBannersQuery({
    variables: {
      filter: {
        type: "BRAND"
      },
      first: 3
    }
  })
  const brands = data?.banners?.edges.map((el) => el.node);

  return (
    <Stack direction="row" margin="0 auto" flexWrap="wrap">
      {brands?.map((item) => (
        <BrandWrapper key={item.id}>
          {
            item.backgroundImage ?
              <LazyImage 
                src={item.backgroundImage?.url}
                alt={item.backgroundImage?.alt ? item.backgroundImage?.alt : 'brand'}
              />
            :
            <Skeleton variant="rectangular" width='100%' height='100%' />
          }
        </BrandWrapper>
      ))}

    </Stack>
  );
}
export default PopularBrands;
