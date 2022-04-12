import { Container, Grid, Skeleton, Typography } from '@mui/material';
import colors from 'config/theme';
import React from 'react';
import { useBannersQuery } from 'graphql/generated.graphql';
import styled from 'styled-components';
import { LazyImage } from 'components/image';
import Image from 'next/image';

const ActionWrapper = styled.div`
  background-color: ${colors.primary.default};
  padding: 30px 40px;
  margin: 5rem 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const action = () => {
  const { data, loading } = useBannersQuery({
    variables: {
      filter: {
        type: "DISCOUNT"
      },
      first: 3
    }
  })
  const discounts = data?.banners?.edges.map((el) => el.node);

  return (
    <ActionWrapper>
      <Container maxWidth="lg">
        <Typography variant="h2" mb={1} fontWeight={600}>
          Акции
        </Typography>
        {loading ?
          <Grid direction="row" spacing={2} justifyContent='center' container>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width='100%' height={264} />
            </Grid>
          </Grid>
          :
          <Grid direction="row" spacing={2} justifyContent='center' container>
            {discounts?.map((el) => (
              <Grid key={el.id} item lg={4}>
                {
                  el.backgroundImage ?
                    <LazyImage src={el.backgroundImage?.url} alt={el.backgroundImage?.alt ? el.backgroundImage?.alt : 'product'} />
                    :
                    <Skeleton variant="rectangular" width='100%' height={264} />
                }
              </Grid>
            ))}
          </Grid>
        }
      </Container>
    </ActionWrapper>
  );
};

export default action;
