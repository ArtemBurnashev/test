import { Stack, Typography } from '@mui/material';
import { Button } from 'components/button';
import Input from 'components/input';
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useRegisterMutation } from 'graphql/generated.graphql';
import colors from 'config/theme';
import { AuthRoutes, PagePropsWithPhoneNumber } from './auth-sidebar';

interface LoginInput {
  phone: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName?: string;
}

const schema = yup.object({
  phone: yup
    .string()
    .matches(
      /(?:\+\998([0123456789][012345789]|6[125679]|7[01234569])[0-9]{7})$/,
      'Phone number is invalid'
    )
    .required('Phone number required.'),
  password: yup.string().required('Password required.'),
  confirmPassword: yup.string().required('Password confirmation required.'),
  firstName: yup.string().required("firstName required"),
  LastName: yup.string()
});

const SignUp: React.FC<PagePropsWithPhoneNumber> = ({ changeRoute, onPhoneChange }) => {
  const [mutate, { data, loading }] = useRegisterMutation();
  const { control, handleSubmit } = useForm<LoginInput>({
    resolver: yupResolver(schema),
    defaultValues: { phone: '+998' },
  });

  const onSubmit = (data: LoginInput) => {
    mutate({
      variables: data,
      onCompleted: (res) => {
        if (res.accountRegister?.errors.length === 0 && res.accountRegister.user?.phone && onPhoneChange) {
          onPhoneChange(res.accountRegister.user?.phone)
          changeRoute(AuthRoutes.CONFIRMACCOUNT)
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack margin="2rem" spacing={2}>
        <Typography textAlign="center" variant="h2">
          Войти или создать профиль
        </Typography>
        <Controller
          control={control}
          name="phone"
          render={({ field, formState: { errors } }) => (
            <Input
              label="Номер телефона"
              error={
                !!errors.phone?.type ||
                data?.accountRegister?.errors.some((e) => e.field === 'phone')
              }
              helperText={
                errors.phone?.message ||
                data?.accountRegister?.errors
                  .filter((e) => e.field === 'phone')
                  .map((e) => e.message)
                  .join(' ')
              }
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="firstName"
          render={({ field, formState: { errors } }) => (
            <Input
              label="First name"
              error={
                !!errors.firstName?.type ||
                data?.accountRegister?.errors.some(
                  (e) => e.field === 'firstName'
                )
              }
              helperText={
                errors.phone?.message ||
                data?.accountRegister?.errors
                  .filter((e) => e.field === 'firstName')
                  .map((e) => e.message)
                  .join(' ')
              }
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field, formState: { errors } }) => (
            <Input
              label="Last name"
              error={
                !!errors.lastName?.type ||
                data?.accountRegister?.errors.some(
                  (e) => e.field === 'lastName'
                )
              }
              helperText={
                errors.lastName?.message ||
                data?.accountRegister?.errors
                  .filter((e) => e.field === 'lastName')
                  .map((e) => e.message)
                  .join(' ')
              }
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field, formState: { errors } }) => (
            <Input
              label="Пароль"
              type="password"
              placeholder="*******"
              error={
                !!errors.password?.type ||
                data?.accountRegister?.errors.some(
                  (e) => e.field === 'password'
                )
              }
              helperText={
                errors.password?.message ||
                data?.accountRegister?.errors
                  .filter((e) => e.field === 'password')
                  .map((e) => e.message)
                  .join(' ')
              }
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, formState: { errors } }) => (
            <Input
              label="Confirm password"
              type="password"
              placeholder="*******"
              error={
                !!errors.confirmPassword?.type ||
                data?.accountRegister?.errors.some(
                  (e) => e.field === 'password'
                )
              }
              helperText={
                errors.confirmPassword?.message ||
                data?.accountRegister?.errors
                  .filter((e) => e.field === 'password')
                  .map((e) => e.message)
                  .join(' ')
              }
              {...field}
            />
          )}
        />

        <Stack direction="row" justifyContent="end">
          <Button
            variant="text"
            type="button"
            sx={{
              maxWidth: 'max-content',
              color: colors.black,
            }}
          >
            Забыли пароль?
          </Button>
        </Stack>
        <Button loading={loading} type="submit" fullWidth variant="contained">
          Зарегистрироваться
        </Button>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          sx={{ color: colors.black }}
          onClick={() => changeRoute(AuthRoutes.LOGIN)}
        >
          Войти
        </Button>
      </Stack>
    </form>
  );
};

export default SignUp;
