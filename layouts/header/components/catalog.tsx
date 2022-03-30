import { CircularProgress, Grid, Paper } from '@mui/material';
import { InfiniteLoader } from 'components/loaders/infinite-loader';
import colors from 'config/theme';
import { useAllCategoriesQuery } from 'graphql/generated.graphql';
import React from 'react';
import styled from 'styled-components';
import CatalogItem from './catalog-item';

const Wrapper = styled.div`
  padding: 52px 104px;
  background-color: ${colors.white};
  max-width: 1087px;
  display: flex;
  max-height: 664px;
`;

const Catalog = () => {
  const { data, loading, fetchMore } = useAllCategoriesQuery({
    variables: { first: 10, cursor: '' },
  });
  const nodes = data?.categories?.edges.map((category) => category.node);
  const pageInfo = data?.categories?.pageInfo;

  if (loading) {
    return (
      <Wrapper>
        <CircularProgress color="primary" size={50} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Grid justifyContent="space-between" rowGap="2rem" container>
        <InfiniteLoader
          loadMore={() =>
            fetchMore({ variables: { cursor: pageInfo?.endCursor } })
          }
          hasMore={pageInfo?.hasNextPage}
        >
          {nodes?.map((node) => (
            <Grid item xs={4}>
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
    </Wrapper>
  );
};

export default Catalog;
