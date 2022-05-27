import React from 'react';
import ElementsWrap from './elements-wrap';

interface Props {
  setStepActive: React.Dispatch<React.SetStateAction<number>>;
}

const StepTwo: React.FC<Props> = () => {
  return (
    <ElementsWrap>
      <div>StepTwo</div>
    </ElementsWrap>
  )
}

export default StepTwo