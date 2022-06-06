import React from 'react';
import { Stack, Stepper, StepLabel, Step } from '@mui/material';
import colors from 'config/theme';
import SwitchInstalments from './switch-instalments';


const stepLable = [
  {
    lable: 'Личные данные',
    id: 1,
  },
  {
    lable: 'Подтвердите личность',
    id: 2,
  },
  {
    lable: 'Телефоны',
    id: 3,
  },
  {
    lable: 'Данные о карте',
    id: 4,
  }
]

const withAuthLable = [
  {
    lable: 'Search',
    id: 1,
  },
  {
    lable: 'Search',
    id: 2,
  },
  {
    lable: 'Search',
    id: 3,
  },
]

const stepperStyle = {
  '.iTqaTQ.Mui-active': { color: colors.black },
  '.MuiStepIcon-text': { fill: colors.white },
  '.iTqaTQ.Mui-completed': { color: colors.black },
}

const MainInstalments: React.FC = () => {
  const [stepActive, setStepActive] = React.useState(0)
  const idf = false;
  const changeStep = (id: number) => {

    if (id <= stepActive) {
      setStepActive(id - 1);
    }
  }

  return (
    <>
      <Stack sx={{ marginTop: { xs: '30px', lg: '0' } }} mb='24px'>
        {idf ?
          <Stepper
            activeStep={stepActive}
            sx={{ ...stepperStyle }}
            alternativeLabel
          >
            {withAuthLable.map((i) => (
              <Step sx={{ cursor: 'pointer' }} onClick={() => changeStep(i.id)} key={i.id}>
                <StepLabel>{i.lable}</StepLabel>
              </Step>
            ))}

          </Stepper>
          :
          <Stepper
            activeStep={stepActive}
            sx={{ ...stepperStyle }}
            alternativeLabel
          >
            {stepLable.map((i) => (
              <Step sx={{ cursor: 'pointer' }} onClick={() => changeStep(i.id)} key={i.id}>
                <StepLabel>{i.lable}</StepLabel>
              </Step>
            ))}

          </Stepper>
        }

      </Stack>
      <SwitchInstalments setStepActive={setStepActive} idenfy={idf} stepActive={stepActive} />
    </>

  )
}

export default MainInstalments;