import React from 'react';
import Trash from 'components/icons/trash';
import EditIcon from 'components/icons/edit';
import { IconButton } from '@mui/material';
import { useModal } from 'hooks/use-modal';
import { useDeleteAddressMutation } from 'graphql/generated.graphql';
import { Typography, Grid, Stack, Dialog } from '@mui/material';
import { AddressCreate } from 'components/address-items';



interface AddressProps {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    phone?: string | null | undefined;
    streetAddress1: string;
    streetAddress2: string;
    postalCode: string;
    country: {
      _typename?: "CountryDisplay" | undefined;
      code: string;
      country: string;
    };
  } | null
  backdrop: {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
  }
}

export const AddresCard: React.FC<AddressProps> = ({ data, backdrop }) => {
  const [mutation, mutationData] = useDeleteAddressMutation();
  const editModal = useModal();

  const deleteCard = () => {
    if (data?.id) {
      backdrop.open()
      mutation({
        variables: {
          id: data?.id
        },
        refetchQueries: ['AddressList'],
        onCompleted: () => {
          backdrop.close()
        }
      })
    }

  }
  
  return (
    <Grid item xs={6}>
      <Dialog 
        open={editModal.isOpen}
        onClose={editModal.close}
      >
        <AddressCreate data={data} backdrop={backdrop} modalClose={editModal.close} />
      </Dialog>
      <Stack spacing={2} sx={{ border: '1px solid #e5e5e5', padding: '20px', position: 'relative' }}>
        <Stack alignItems='center' direction={'row'} sx={{ position: 'absolute', right: '10px', top: '10px' }}>
          <IconButton onClick={()=> editModal.open()} sx={{ width: '40px', height: '40px' }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={deleteCard} sx={{ width: '45px', height: '45px' }}>
            <Trash  />
          </IconButton>
        </Stack>
        <Typography sx={{ borderBottom: '1px solid #e5e5e5' }} gap={3} alignItems={'center'} display={'flex'} variant='body1'>
          <Typography variant='h6'>
            Name
          </Typography>
          {data?.firstName}
        </Typography>
        <Typography sx={{ borderBottom: '1px solid #e5e5e5' }} gap={3} alignItems={'center'} display={'flex'} variant='body1'>
          <Typography variant='h6'>
            Phone
          </Typography>
          {data?.phone}
        </Typography>
        <Typography sx={{ borderBottom: '1px solid #e5e5e5' }} gap={3} alignItems={'center'} display={'flex'} variant='body1'>
          <Typography variant='h6'>
            Addres
          </Typography>
          {data?.streetAddress1}
        </Typography>
      </Stack>
    </Grid>
  )
}
