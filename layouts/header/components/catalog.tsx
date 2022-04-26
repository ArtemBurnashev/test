import { CircularProgress, Grid, Paper ,Stack} from '@mui/material';
import { InfiniteLoader } from 'components/loaders/infinite-loader';
import colors from 'config/theme';
import { useAllCategoriesQuery } from 'graphql/generated.graphql';
import React from 'react';
import styled from 'styled-components';
import { Backdrop } from '@mui/material';
import CatalogItem from './catalog-item';



const Catalog = () => {
  const { data, loading, fetchMore } = useAllCategoriesQuery({
    variables: { first: 100, cursor: '' },
  });
  const nodes = data?.categories?.edges.filter(category => category.node.children?.edges && category.node.children?.edges?.length > 0).map((category) => category.node);
  const pageInfo = data?.categories?.pageInfo;


  if (loading) {
    return (
        <Backdrop open={true}  color={colors.primary.default}>
          <CircularProgress/>
        </Backdrop>
    );
  }

  console.log(data);
  
  return (
    <Stack padding={{md:'40px',lg:'52px 88px',xs:'30px'}}>
      <Grid
        mb="2rem"
        justifyContent="space-between"
        rowGap="1rem"
        columnSpacing={2}
        container
      >
        <InfiniteLoader
          loadMore={() =>
            fetchMore({ variables: { cursor: pageInfo?.endCursor } })
          }
          hasMore={pageInfo?.hasNextPage}
        >
          {nodes?.map((node) => (
            <Grid justifyContent="flex-start" item lg={4} md={6} sm={12} xs={12}>
              <CatalogItem
                key={node.id}
                title={node.name}
                image={node.backgroundImage}
                slug={node.slug}
                children={node.children?.edges.map((child) => ({
                  title: child.node.name,
                  slug: child.node.slug,
                }))}
              />
            </Grid>
          ))}
        </InfiniteLoader>
      </Grid>
    </Stack>
  );
};

export default Catalog;
