import ElementsWrap from './elements-wrap';
import React from 'react';
import * as Yup from 'yup';
import Input from 'components/input/input';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, Typography } from '@mui/material';


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

const StepOne: React.FC<Props> = ({ setStepActive }) => {

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm<LoginInput>(formOptions);
  const { errors } = formState;
  const onSubmit = (item:LoginInput) => {
    setStepActive(1)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '32px' }}>
      <ElementsWrap>
        <Typography mb='24px' variant='h2'>Личные данные</Typography>
        <Typography mb='12px'>Семейное положение</Typography>
        <Input
          fullWidth
          type='text'
          {...register('famly')}
          error={!!errors.famly?.type}
          helperText={errors.famly?.message}
        />
        <Typography mt='16px' mb='12px'>Место работы</Typography>
        <Input
          fullWidth
          type='text'
          {...register('work')}
          error={!!errors.work?.type}
          helperText={errors.work?.message}
        />
        <Typography mt='16px' mb='12px'>Должность</Typography>
        <Input
          fullWidth
          type='text'
          {...register('job')}
          error={!!errors.job?.type}
          helperText={errors.job?.message}
        />
        <Typography mt='16px' mb='12px'>Стаж</Typography>
        <Input
          fullWidth
          type='text'
          {...register('level')}
          error={!!errors.level?.type}
          helperText={errors.level?.message}
        />
        <Typography mt='16px' mb='12px'>Зарплата</Typography>
        <Input
          fullWidth
          type='text'
          {...register('salary')}
          error={!!errors.salary?.type}
          helperText={errors.salary?.message}
        />
        <Typography mt='16px' mb='12px'>Место работы</Typography>
      </ElementsWrap>
      <Stack mt='44px' direction='row' justifyContent='end'>
        <Button type='submit' sx={{ width: { lg: '300px' } }} variant='contained'>Далее</Button>
      </Stack>
    </form>

  )
}

export default StepOne;