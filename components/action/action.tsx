import { Container, Stack, Typography } from '@mui/material';
import colors from 'config/theme';
import React from 'react';
import styled from 'styled-components';
import Action1 from 'assets/png/action1.png';
import Action2 from 'assets/png/action2.png';
import Action3 from 'assets/png/action3.png';
import Image from 'next/image';

const ActionWrapper = styled.div`
  background-color: ${colors.primary.default};
  padding: 30px 40px;
  margin: 5rem 0;
`;

const ActionImage = styled.div`
  max-width: 430px;
  height: 240px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const action = () => {
  return (
    <ActionWrapper>
      <Container maxWidth="lg">
        <Typography variant="h2" fontWeight={600}>
          Акции
        </Typography>
        <Stack spacing={2} direction="row">
          <ActionImage>
            <Image layout="responsive" src={Action1} alt="action" />
          </ActionImage>
          <ActionImage>
            <Image layout="responsive" src={Action2} alt="action" />
          </ActionImage>
          <ActionImage>
            <Image layout="responsive" src={Action3} alt="action" />
          </ActionImage>
        </Stack>
      </Container>
    </ActionWrapper>
  );
};

export default action;
