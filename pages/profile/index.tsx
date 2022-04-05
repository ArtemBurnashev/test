import { Container, Skeleton, Dialog, Stack, Typography } from '@mui/material';
import { Button } from 'components/button';
import DataLineWithArrow from 'components/common/datalineWithArrow';
import { Main } from 'layouts/main';
import { ProfileLayout } from 'layouts/profile';
import { NextPage } from 'next';
import React from 'react';
import { Paths } from 'config/site-paths';
import { useMeQuery } from 'graphql/generated.graphql';
import { Breadcrumb } from 'components/breadcrumbs';
import { WithAuth } from 'components/private-route';
import { ChengePassword, ChengeData } from 'components/chenge-user-content';
import { useModal } from 'hooks/use-modal';
import Close from 'components/icons/close';

const ProfilePage: NextPage = () => {
  const [modalType, setModalTyupe] = React.useState(false);
  const catalogModal = useModal();
  const { data, loading } = useMeQuery();
  const links = [
    {
      name: 'Личный кабинет',
      link: Paths.PROFILE,
    }
  ]

  return (
    <Main>
      <Container maxWidth="xl">
        <Breadcrumb data={links} />
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
            <DataLineWithArrow field="Электронная почтa" value="" />
            <Button onClick={() => { catalogModal.open(); setModalTyupe(true) }} sx={{ maxWidth: 'max-content' }} color="secondary">
              ИЗМЕНИТЬ
            </Button>
            <Typography variant="h2">Пароль</Typography>
            <DataLineWithArrow field="Текущий пароль" value="********" />
            <Button onClick={() => { catalogModal.open(); setModalTyupe(false) }} sx={{ maxWidth: 'max-content' }} color="secondary">
              ИЗМЕНИТЬ
            </Button>
          </Stack>
        </ProfileLayout>
        <Dialog
          open={catalogModal.isOpen}
          onClose={catalogModal.close}
        >
          <Close
            style={{ 
              right: '10px', 
              top:'10px',
              cursor: 'pointer',
              position: 'absolute', 
            }}
            onClick={catalogModal.close}
          />
          {modalType ?
            <ChengeData />
            :
            <ChengePassword />
          }
        </Dialog>
      </Container>
    </Main>
  );
};

export default WithAuth(ProfilePage);
