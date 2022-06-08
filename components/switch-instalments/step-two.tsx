import { Button, Stack, Typography} from '@mui/material';
import { Box } from '@mui/system';
import colors from 'config/theme';
import React from 'react';
import { UploadFile } from './components';
import ElementsWrap from './elements-wrap';

interface Props {
  setStepActive: React.Dispatch<React.SetStateAction<number>>;
}

const StepTwo: React.FC<Props> = ({ setStepActive }) => {


  const setValue = (a: string, b: string) => {
    console.log(a, b);
  }
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStepActive(2)
  }

  return (
    <form onSubmit={submit}>
      <ElementsWrap>
        <Typography mb='24px' variant='h2'>Подтвердите личность</Typography>
        {/* IMg upload */}
        <UploadFile onChange={(fileName) => setValue('profile_photo', fileName)}>
          {({ isLoading, handleClick, preview }) => (<Box mb='32px'>
            <Stack direction={{lg:'row',md:'row',xs:"column"}} alignItems='center' gap="24px">
              <Stack height='96px' minWidth='130px' maxWidth='130px' bgcolor='#6981A5' flexGrow={1}>
                {preview && (
                  <img
                    style={{ objectFit: 'contain' }}
                    width='100%'
                    height='100%'
                    src={preview}
                    alt="profile_photo"
                  />
                )}
              </Stack>
              <Stack flexGrow={2} >
                <Typography mb='12px' maxWidth='362px'  variant='subtitle2'>Фото паспорта с первой страницы</Typography>
                <Typography p='4px 12px' maxWidth='362px'  variant='subtitle2' bgcolor={colors.grey.dlight}>Фото паспорта не загружено</Typography>
              </Stack>
              <Stack maxWidth='158px' flexGrow={1}>
                <Button sx={{ color: '#000',maxWidth:'158px' }} variant='text' {...(!isLoading && { onClick: handleClick })}>Прикрепить</Button>
              </Stack>
            </Stack>
          </Box>)}
        </UploadFile>
        {/* IMg upload */}
        <UploadFile onChange={(fileName) => setValue('profile_photo', fileName)}>
          {({ isLoading, handleClick, preview }) => (<Box mb='32px'>
            <Stack direction={{lg:'row',xs:"column",md:'row'}} alignItems='center' gap="24px">
              <Stack height='96px' maxWidth='130px' minWidth='130px' bgcolor='#6981A5' flexGrow={1}>
                {preview && (
                  <img
                    style={{ objectFit: 'contain' }}
                    width='100%'
                    height='100%'
                    src={preview}
                    alt="profile_photo"
                  />
                )}
              </Stack>
              <Stack flexGrow={2} >
                <Typography mb='12px' maxWidth='362px' textAlign={{lg:'start',md:'start',xs:"center"}} variant='subtitle2'>Загрузите фото лица на фоне паспорта</Typography>
                <Typography p='4px 12px' maxWidth='362px' variant='subtitle2' bgcolor={colors.grey.dlight}>Фото пасспорта на фоне лица не загружено</Typography>
              </Stack>
              <Stack maxWidth='158px' flexGrow={1}>
                <Button sx={{ color: '#000',maxWidth:'158px' }} variant='text' {...(!isLoading && { onClick: handleClick })}>Прикрепить</Button>
              </Stack>
            </Stack>
          </Box>)}
        </UploadFile>
        {/* IMg upload */}
        <UploadFile onChange={(fileName) => setValue('profile_photo', fileName)}>
          {({ isLoading, handleClick, preview }) => (<Box >
            <Stack direction={{lg:'row',xs:"column",md:'row'}} alignItems='center' gap="24px">
              <Stack height='96px' maxWidth='130px' minWidth='130px' bgcolor='#6981A5' flexGrow={1}>
                {preview && (
                  <img
                    style={{ objectFit: 'contain' }}
                    width='100%'
                    height='100%'
                    src={preview}
                    alt="profile_photo"
                  />
                )}
              </Stack>
              <Stack flexGrow={2} >
                <Typography mb='12px' maxWidth='362px'  variant='subtitle2'>Загрузите фото прописки с паспорта</Typography>
                <Typography p='4px 12px' maxWidth='362px'  variant='subtitle2' bgcolor={colors.grey.dlight}>Фото паспорта не загружено</Typography>
              </Stack>
              <Stack maxWidth='158px' flexGrow={1}>
                <Button sx={{ color: '#000' ,maxWidth:'158px'}} variant='text' {...(!isLoading && { onClick: handleClick })}>Прикрепить</Button>
              </Stack>
            </Stack>
          </Box>)}
        </UploadFile>
      </ElementsWrap>
      <Stack mt='44px' direction='row' justifyContent='end'>
        <Button type='submit' sx={{ width: { lg: '300px' } }} variant='contained'>Далее</Button>
      </Stack>
    </form>

  )
}

export default StepTwo