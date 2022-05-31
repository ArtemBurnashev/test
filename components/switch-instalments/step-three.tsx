import { Typography} from '@mui/material';
import React from 'react';
import * as Yup from 'yup';
import Input from 'components/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import ElementsWrap from './elements-wrap';


interface Props {
  setStepActive: React.Dispatch<React.SetStateAction<number>>;
}

interface LoginInput {
  famly: string;
  job: string;
  work: string;
  level: string;
  salary: string;

}

const validationSchema = Yup.object().shape({
  famly: Yup.string().max(1000)
    .required('Family status'),
  job: Yup.string().max(1000)
    .required('Job title required.'),
  work: Yup.string().max(1000)
    .required('Place of work required.'),
  level: Yup.string().max(1000)
    .required('Experience is required'),
  salary: Yup.string().max(1000)
    .required('Salary is required'),
});

const StepThree: React.FC<Props> = ({ setStepActive }) => {

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm<LoginInput>(formOptions);
  const { errors } = formState;
  const onSubmit = (item: LoginInput) => {
    
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ElementsWrap>
        <Typography mb='12px' variant='h2'>Телефоны</Typography>
        <Typography mb='24px'>Введите два дополнительных номера телефонов своих родственников или близких</Typography>
        <Typography mb='12px'>Семейное положение</Typography>
        <Input
          fullWidth
          type='text'
          {...register('famly')}
          error={!!errors.famly?.type}
          helperText={errors.famly?.message}
        />
        <Typography mb='12px'>Семейное положение</Typography>
        <Input
          fullWidth
          type='text'
          {...register('famly')}
          error={!!errors.famly?.type}
          helperText={errors.famly?.message}
        />
      </ElementsWrap>
    </form>

  )
}

export default StepThree;