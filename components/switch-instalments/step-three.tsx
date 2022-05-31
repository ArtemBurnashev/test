import { Button, Typography } from '@mui/material';
import React from 'react';
import * as Yup from 'yup';
// @ts-expect-error
import InputMask from "react-input-mask";
import Input from 'components/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ElementsWrap from './elements-wrap';


interface Props {
  setStepActive: React.Dispatch<React.SetStateAction<number>>;
}

interface LoginInput {
  phone: string;
  secondPhone: string;
}

const validationSchema = Yup.object().shape({
  phone: Yup
    .string()
    .min(15)
    .required('Phone number required.'),
  secondPhone: Yup
    .string()
    .min(15)
    .required('Phone number required.'),

});

const StepThree: React.FC<Props> = ({ setStepActive }) => {

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, control, handleSubmit, reset, formState } = useForm<LoginInput>(formOptions);
  const { errors } = formState;
  const onSubmit = (item: LoginInput) => {
    console.log(item);

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ElementsWrap>
        <Typography mb='12px' variant='h2'>Телефоны</Typography>
        <Typography mb='24px'>Введите два дополнительных номера телефонов своих родственников или близких</Typography>
        <Typography mb='12px'>Мобилный номер</Typography>
        <InputMask {...register('phone')}
          error={!!errors.phone?.type}
          helperText={errors.phone?.message}
          mask="+998999999999" maskChar={null}
        />

        <Typography mt='24px' mb='12px'>Мобилный номер</Typography>
        <Input
          fullWidth
          type='text'
          {...register('secondPhone')}
          error={!!errors.secondPhone?.type}
          helperText={errors.secondPhone?.message}
        />
      </ElementsWrap>
      <Button type='submit'>aefaf</Button>
    </form>

  )
}

export default StepThree;