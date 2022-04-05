import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormStyle } from './styles';
import Input from 'components/input/input';
import { Stack } from '@mui/material';
import { Button } from 'components/button';


export const ChengeData: React.FC = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    name: Yup.string()
      .max(50)
      .required('Name is required'),
    phone: Yup.string()
      .matches(/(?:\+\998(9[012345789]|6[125679]|7[01234569])[0-9]{7})$/, 'Phone number is invalid')
      .required('Phone number required.'),

  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;


  function onSubmit(data: any) {
    console.log(data);
    reset()
    return false;
  }
  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <label>Email</label>
        <Input
          type='email'
          {...register('email')}
          error={!!errors.email?.type}
          helperText={errors.email?.message}
        />
        <label>Name</label>
        <Input
          error={!!errors.name?.type}
          helperText={errors.name?.message}
          type="text" {...register('name')}
        />
        <label>Phone Number</label>
        <Input
          error={!!errors.phone?.type}
          helperText={errors.phone?.message}
          {...register('phone')}
        />
        <Button variant='contained' type="submit">Register</Button>
      </Stack>
    </FormStyle>
  )
}
