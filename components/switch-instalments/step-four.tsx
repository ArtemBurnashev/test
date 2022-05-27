import React from 'react';
import ElementsWrap from './elements-wrap';

interface Props {
  setStepActive: React.Dispatch<React.SetStateAction<number>>;
}

const StepFour: React.FC<Props> = ({ setStepActive }) => {
  return (
    <ElementsWrap>
      <div>StepFour</div>
    </ElementsWrap>
  )
}

export default StepFour;