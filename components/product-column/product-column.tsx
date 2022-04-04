import { Stack, Typography } from '@mui/material';
import ProductCardHorizontal from 'components/cards/product-card-horizontal';
import Spacer from 'components/common/spacer';
import { useCategoryQuery } from 'graphql/generated.graphql';
import React from 'react';

const ProductColumn: React.FC<{ label: string, slug: string }> = ({ label, slug }) => {
   const { data, loading, fetchMore } = useCategoryQuery({
     variables: {
       first: 3,
       slug: Array.isArray(slug) ? slug[0] : slug || '',
       cursor: '',
     },
     skip: !slug,
   });

   const products = data?.category?.products?.edges.map(product => product.node)
  
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">{data?.category?.name}</Typography>
      <Spacer />
      {products?.map((product) => (
        <ProductCardHorizontal name={product.name} slug={product.slug} image={product?.media && product.media[0].url} price={product.defaultVariant?.pricing?.price?.gross} discount={product.defaultVariant?.pricing?.discount?.gross} />
      ))}
    </Stack>
  );
};

export default ProductColumn;
