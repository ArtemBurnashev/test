import React from 'react';
import ElementsWrap from './elements-wrap';


interface Props {
  setStepActive: React.Dispatch<React.SetStateAction<number>>;
}


const StepThree: React.FC<Props> = ({ setStepActive }) => {
  return (
    <ElementsWrap>
      <div>StepThree</div>
    </ElementsWrap>
  )
}

export default StepThree;