import { Button, Typography, Stack } from '@mui/material';
import React from 'react';
import * as Yup from 'yup';
// @ts-expect-error
import InputMask from "react-input-mask";
import Input from 'components/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
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
  const { register, control, handleSubmit, reset, formState } = useForm<LoginInput>({ ...formOptions, defaultValues: { phone: '+998', secondPhone: '+998' } });
  const { errors } = formState;
  const onSubmit = (item: LoginInput) => {
    item.phone = item.phone.replace("(", "").replace(")", "");
    item.secondPhone = item.secondPhone.replace("(", "").replace(")", "");
    console.log(item);

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ElementsWrap>
        <Typography mb='12px' variant='h2'>Телефоны</Typography>
        <Typography mb='24px'>Введите два дополнительных номера телефонов своих родственников или близких</Typography>
        <Typography mb='12px'>Мобилный номер</Typography>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <InputMask mask="+999(99)9999999" value={value} onChange={onChange}>
              {(inputProps: any) => (
                <Input
                  error={!!errors.phone?.type}
                  helperText={errors.phone?.message}
                  {...inputProps}
                />
              )}

            </InputMask>

          )}
        />
        <Typography mt='24px' mb='12px'>Мобилный номер</Typography>
        <Controller
          control={control}
          name="secondPhone"
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <InputMask mask="+999(99)9999999" value={value} onChange={onChange}>
              {(inputProps: any) => (
                <Input
                  error={!!errors.secondPhone?.type}
                  helperText={errors.secondPhone?.message}
                  {...inputProps}
                />
              )}

            </InputMask>

          )}
        />
      </ElementsWrap>
      <Stack mt='44px' direction='row' justifyContent='end'>
        <Button type='submit' sx={{ width: { lg: '300px' } }} variant='contained'>Далее</Button>
      </Stack>
    </form>

  )
}

export default StepThree;