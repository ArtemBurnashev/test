import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormStyle } from './styles';
import Input from 'components/input/input';
import { Stack } from '@mui/material';
import { Button } from 'components/button';
import { useChangePasswordMutation } from 'graphql/generated.graphql';


export const ChengePassword: React.FC = () => {
  const [changePassword, { loading, error: passwordChangeError }] = useChangePasswordMutation();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    lastPassword: Yup.string()
      .required('last Password is required')
      .min(8, 'Password must be at least 8 characters'),

  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;


  function onSubmit(data: any) {
    changePassword(
      {
        variables: {
          oldPassword: data.lastPassword,
          newPassword: data.password
        }
      }
    )
    reset()
    return false;
  }
  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <label>Last Password</label>
        <Input
          type='password'
          {...register('lastPassword')}
          error={!!errors.lastPassword?.type}
          helperText={errors.lastPassword?.message}
        />
        <label>Password</label>
        <Input
          error={!!errors.password?.type}
          helperText={errors.password?.message}
          type="password" {...register('password')}
        />
        <label>Confirm Password</label>
        <Input
          error={!!errors.confirmPassword?.type}
          helperText={errors.confirmPassword?.message}
          type="password"
          {...register('confirmPassword')}
        />
        <Button variant='contained' type="submit">Register</Button>
      </Stack>
    </FormStyle>
  )
}
