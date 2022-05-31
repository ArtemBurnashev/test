import { NextPage } from 'next';
import React from 'react';
import { ProfileLayout } from 'layouts/profile';
import { Main } from 'layouts/main';
import { Paths } from 'config/site-paths';
import { Breadcrumb } from 'components/breadcrumbs';
import { SwitchInstalments } from 'components/switch-instalments';
import { Container, Stack, Typography, Skeleton, useMediaQuery, Stepper, Step, StepLabel } from '@mui/material';
import colors from 'config/theme';


const stepLable = [
  {
    lable:'Личные данные',
    id:1,
  },
  {
    lable:'Подтвердите личность',
    id:2,
  },
  {
    lable:'Телефоны',
    id:3,
  },
  {
    lable:'Данные о карте',
    id:4,
  }
]

const PaymentByInstalments: NextPage = () => {
  const md = useMediaQuery('(max-width:899px)');
  const [stepActive, setStepActive] = React.useState(2)
  const links = [
    {
      name: 'оплата в рассрочку',
      link: Paths.INSTALMENTS,
    },
  ];

  const changeStep = (id:number) => {
    
    if(id <= stepActive){
      setStepActive(id-1);
    }
  }

  return (
    <Main>
      <Container maxWidth='xl'>
        {!md && <Breadcrumb data={links} />}

        <ProfileLayout loading={false}
          loadingFallBack={
            <Stack gap="1rem">
              <Typography variant="h2">
                <Skeleton variant="text" width="40%" />
              </Typography>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="50%" />
            </Stack>
          }>
          <Stack sx={{marginTop:{xs:'30px',lg:'0'}}} mb='24px'>
            <Stepper
              activeStep={stepActive}
              sx={
                {
                  '.iTqaTQ.Mui-active': { color: colors.black },
                  '.MuiStepIcon-text': { fill: colors.white },
                  '.iTqaTQ.Mui-completed':{color:colors.black}
                }
              }
              alternativeLabel
            >
              {stepLable.map((i) => (
                <Step sx={{cursor:'pointer'}} onClick={()=> changeStep(i.id)} key={i.id}>
                  <StepLabel>{i.lable}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>

          <SwitchInstalments setStepActive={setStepActive} stepActive={stepActive} />

        </ProfileLayout>
      </Container>
    </Main>

  )
}

export default PaymentByInstalments;