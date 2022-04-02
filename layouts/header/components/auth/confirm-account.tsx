import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Typography } from '@mui/material';
import { Button } from 'components/button';
import Input from 'components/input';
import { useConfirmAccountMutation } from 'graphql/generated.graphql';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AuthRoutes, PagePropsWithPhoneNumber } from './auth-sidebar';

const confirmAccountSchema = yup.object({
  token: yup.string().required('Confirm code required'),
});

const ConfirmAccount: React.FC<PagePropsWithPhoneNumber> = ({
  changeRoute,
  phone,
}) => {
  const [confirmAccount, { data }] = useConfirmAccountMutation();
  const { control, handleSubmit } = useForm<{ token: string }>({
    resolver: yupResolver(confirmAccountSchema),
  });

  const handleConfirmAccount = (data: { token: string }) => {
    if (!phone) return;
    confirmAccount({
      variables: { phone, code: data.token },
      onCompleted: (res) => {
        if (res.confirmAccount?.accountErrors.length === 0) {
          changeRoute(AuthRoutes.LOGIN);
        }
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(handleConfirmAccount)}>
      <Stack margin="2rem" spacing={2}>
        <Typography variant="h2" textAlign="center">
          Confirm account
        </Typography>
        <Typography textAlign="center" variant="body1">
          {phone} raqamiga yuborilgan kodni kiriting
        </Typography>
        <Controller
          control={control}
          name="token"
          render={({ field, formState: { errors } }) => (
            <Input
              label="confirm code"
              error={
                !!errors.token?.type || !!data?.confirmAccount?.accountErrors
              }
              helperText={
                errors.token?.message ||
                data?.confirmAccount?.accountErrors
                  .map((error) => error.message)
                  .join(' ')
              }
              {...field}
            />
          )}
        />
        <Button variant="contained">Confirm</Button>
      </Stack>
    </form>
  );
};

export default ConfirmAccount;
