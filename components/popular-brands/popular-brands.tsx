import React from 'react';
import { BrandWrapper } from './brands.styles';
import { Skeleton } from '@mui/material';
import { useBannersQuery } from 'graphql/generated.graphql';
import { Stack } from '@mui/material';
import { LazyImage } from 'components/image';


const PopularBrands = () => {
  const { data } = useBannersQuery({
    variables: {
      filter: {
        type: "BRAND"
      },
      first: 50
    }
  })
  const brands = data?.banners?.edges.map((el) => el.node);

  return (
    <Stack direction="row" gap='16px' margin="0 auto" flexWrap="wrap">
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
