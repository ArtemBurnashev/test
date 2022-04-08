import { Container, Grid, Stack, Typography } from '@mui/material';
import colors from 'config/theme';
import React from 'react';
import styled from 'styled-components';
import action1 from 'assets/png/action1-1.jpg';
import action2 from 'assets/png/action1-2.jpg';
import action3 from 'assets/png/action1-3.jpg';

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
  return (
    <ActionWrapper>
      <Container maxWidth="lg">
        <Typography variant="h2" mb={1} fontWeight={600}>
          Акции
        </Typography>
        <Grid direction="row" spacing={2} justifyContent='center' container>
          <Grid item lg={4}>
            <Image src={action1} alt='foto' />
          </Grid>

          <Grid item lg={4}>
            <Image src={action2} alt='foto' />
          </Grid>

          <Grid item lg={4}>
            <Image src={action3} alt='foto' />
          </Grid>
        </Grid>
      </Container>
    </ActionWrapper>
  );
};

export default action;
