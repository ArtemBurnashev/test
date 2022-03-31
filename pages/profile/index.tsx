import { Container, Skeleton, Stack, Typography } from '@mui/material';
import { Button } from 'components/button';
import DataLineWithArrow from 'components/common/datalineWithArrow';
import { Main } from 'layouts/main';
import { ProfileLayout } from 'layouts/profile';
import { NextPage } from 'next';
import React from 'react';
import { useMeQuery } from 'graphql/generated.graphql';
import { WithAuth } from 'components/private-route';

const ProfilePage: NextPage = () => {
  const { data, loading } = useMeQuery();

  return (
    <Main>
      <Container maxWidth="xl">
        <ProfileLayout
          loading={loading}
          loadingFallBack={
            <Stack gap="1rem">
              <Typography variant="h2">
                <Skeleton variant="text" width="40%" />
              </Typography>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="50%" />
            </Stack>
          }
        >
          <Stack gap="1rem">
            <Typography variant="h2">Персональные данные</Typography>
            <DataLineWithArrow field="ID пользователя" value={data?.me?.id} />
            <DataLineWithArrow
              field="Имя и фамилия"
              value={`${data?.me?.firstName} ${data?.me?.lastName}`}
            />
            <DataLineWithArrow field="Номер телефона" value={data?.me?.phone} />
            <DataLineWithArrow field="Пол" value="Мужской" />
            <DataLineWithArrow field="Электронная почтa" value="" />
            <Button sx={{ maxWidth: 'max-content' }} color="secondary">
              ИЗМЕНИТЬ
            </Button>
            <Typography variant="h2">Пароль</Typography>
            <DataLineWithArrow field="Текущий пароль" value="********" />
            <Button sx={{ maxWidth: 'max-content' }} color="secondary">
              ИЗМЕНИТЬ
            </Button>
          </Stack>
        </ProfileLayout>

      </Container>
    </Main>
  );
};

export default WithAuth(ProfilePage);
