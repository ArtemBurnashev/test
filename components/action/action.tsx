import { Container, Grid, Stack, Typography } from '@mui/material';
import colors from 'config/theme';
import React from 'react';
import styled from 'styled-components';
import { LazyImage } from 'components/image';

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
  return (
    <ActionWrapper>
      <Container maxWidth="lg">
        <Typography variant="h2" fontWeight={600}>
          Акции
        </Typography>
        <Grid direction="row" container>
          <Grid height={240} item lg={4}>
            <LazyImage src='http://staging.api.gipermart.uz/media/products/saleordemoproduct_cl_polo01.png' alt='foto'/>
          </Grid>

          <Grid height={240} item lg={4}>
            <LazyImage src='http://staging.api.gipermart.uz/media/products/saleordemoproduct_cl_polo02.png' alt='foto'/>
          </Grid>

          <Grid height={240} item lg={4}>
            <LazyImage src='http://staging.api.gipermart.uz/media/products/saleordemoproduct_cl_boot07_1.png' alt='foto'/>
          </Grid>
        </Grid>
      </Container>
    </ActionWrapper>
  );
};

export default action;
