import { Stack, Typography } from '@mui/material';
import { Button } from 'components/button';
import Input from 'components/input';
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useLoginMutation } from 'graphql/generated.graphql';
import { useAppDispatch } from 'redux-state/hook';
import { login } from 'redux-state/features/user-slice';
import colors from 'config/theme';
import { AuthRoutes, PageProps } from './auth-sidebar';

interface LoginInput {
  phone: string;
  password: string;
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
});

const Login: React.FC<PageProps> = ({ changeRoute }) => {
  const [mutate, { data, loading }] = useLoginMutation();
  const { control, handleSubmit } = useForm<LoginInput>({
    resolver: yupResolver(schema),
    defaultValues: { phone: '+998' },
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: LoginInput) => {
   
    mutate({
      variables: data,
      onCompleted: (res) => {
        if (res.tokenCreate?.errors.length === 0 && res.tokenCreate.token) {
          dispatch(
            login({
              token: res.tokenCreate.token,
              refreshToken: res.tokenCreate.refreshToken,
              csrfToken: res.tokenCreate.csrfToken,
              userId:res.tokenCreate.user?.id
            })
          );
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack margin="2rem" spacing={2}>
        <Typography textAlign="center" variant="h2">Войти или создать профиль</Typography>
        <Controller
          control={control}
          name="phone"
          render={({ field, formState: { errors } }) => (
            <Input
              label="Номер телефона"
              error={
                !!errors.phone?.type ||
                data?.tokenCreate?.errors.some((e) => e.field === 'phone')
              }
              helperText={
                errors.phone?.message ||
                data?.tokenCreate?.errors
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
          name="password"
          render={({ field, formState: { errors } }) => (
            <Input
              label="Пароль"
              type="password"
              placeholder="*******"
              error={
                !!errors.password?.type ||
                data?.tokenCreate?.errors.some((e) => e.field === 'password')
              }
              helperText={
                errors.password?.message ||
                data?.tokenCreate?.errors
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
          Войти
        </Button>
        <Button
          onClick={() => changeRoute(AuthRoutes.SIGNUP)}
          type="button"
          fullWidth
          variant="outlined"
          sx={{ color: colors.black }}
        >
          Зарегистрироваться
        </Button>
      </Stack>
    </form>
  );
};

export default Login;
