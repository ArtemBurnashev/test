import React from 'react';
import StepOne from './step-one';
import StepTwo from './step-two';
import StepThree from './step-three';
import StepFour from './step-four';


interface Props {
  setStepActive: React.Dispatch<React.SetStateAction<number>>;
  stepActive?: number;
  idenfy: boolean;
}

const SwitchInstalments: React.FC<Props> = ({ setStepActive, stepActive, idenfy }) => {

  if (idenfy) {
    return <div>aefaefaf</div>
  }
  else {
    if (stepActive === 0) {
      return <StepOne setStepActive={setStepActive} />
    }
    if (stepActive === 1) {
      return <StepTwo setStepActive={setStepActive} />
    }
    if (stepActive === 2) {
      return <StepThree setStepActive={setStepActive} />
    }
    if (stepActive === 3) {
      return <StepFour setStepActive={setStepActive} />
    }
  }


  return null;
}

export default SwitchInstalments;