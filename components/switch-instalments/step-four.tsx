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
  card: string;
  validty: string;
  phone: string;
}

const validationSchema = Yup.object().shape({
  card: Yup
    .string()
    .min(19)
    .required('Phone number required.'),
  validty: Yup
    .string()
    .min(5)
    .required('Phone number required.'),
  phone: Yup
    .string()
    .min(15)
    .required('Phone number required.'),
});


const StepFour: React.FC<Props> = ({ setStepActive }) => {

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, control, handleSubmit, reset, formState } = useForm<LoginInput>({ ...formOptions, defaultValues: { phone: '+998' } });
  const { errors } = formState;
  const onSubmit = (item: LoginInput) => {
    item.phone = item.phone.replace("(", "").replace(")", "");
    console.log(item);

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ElementsWrap>
        <Typography mb='12px' variant='h2'>Данные о карте</Typography>
        <Typography mb='24px'>Введенные вами данные храняться конфиденциально и не передаются третьим лицам! Оплата за рассрочку будет взыматься в день ежемесчной оплаты. При подключении карты вы соглашаетесь с публичным договором оферты </Typography>
        <Typography mb='12px'>Номер карты</Typography>
        <Controller
          control={control}
          name="card"
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <InputMask mask="9999 9999 9999 9999" maskChar={null} value={value} onChange={onChange}>
              {(inputProps: any) => (
                <Input
                  placeholder='0000 0000 0000 0000'
                  error={!!errors.card?.type}
                  helperText={errors.card?.message}
                  {...inputProps}
                />
              )}

            </InputMask>

          )}
        />
        <Typography mt='24px' mb='12px'>Срок действия</Typography>
        <Controller
          control={control}
          name="validty"
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <InputMask mask="99/99" maskChar={null} value={value} onChange={onChange}>
              {(inputProps: any) => (
                <Input
                  placeholder='00/00'
                  error={!!errors.validty?.type}
                  helperText={errors.validty?.message}
                  {...inputProps}
                />
              )}

            </InputMask>

          )}
        />
        <Typography mt='24px' mb='12px'>Мобилный номер</Typography>
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
      </ElementsWrap>
      <Stack mt='44px' direction='row' justifyContent='end'>
        <Button type='submit' sx={{ width: { lg: '300px' } }} variant='contained'>Далее</Button>
      </Stack>
    </form>

  )
}

export default StepFour;