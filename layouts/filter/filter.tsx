import {
  AccordionDetails,
  Box,
  Button,
  Checkbox,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import Accordion from 'components/accordion/accordion';
import AccordionSummary from 'components/accordion/accordion-summary';
import Input from 'components/input';
import Select from 'components/select';
import colors from 'config/theme';
import {
  OrderDirection,
  useInitialProductFilterAttributesQuery,
} from 'graphql/generated.graphql';
import React from 'react';
import { changePrice, sort as sortFn } from 'redux-state/features/filter';
import { useAppDispatch, useAppSelector } from 'redux-state/hook';
import ArrowDow from 'components/icons/arrow-down';

const Filter: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const { price, sort } = useAppSelector((state) => state.filter);
  const { data } = useInitialProductFilterAttributesQuery();

  const checkBoxStyle = {
    stack: {
      transition: '.3s',
      borderBottom: '0.5px solid #DCDCDC',
      ':hover': { bgcolor: colors.primary.default },
      p: '8px 0',
      alignItems: 'center',
    },
    p:{
      fontWeight:'500',
      p:'16px 12px',
      borderBottom: '0.5px solid #DCDCDC'
    }

  }

  return (
    <Grid container>
      <Grid item md={3} lg={3}>
        <Stack sx={{ padding: '1rem 0.5rem' }}>
          <Stack border='0.5px solid #DCDCDC'>
            <Typography sx={{...checkBoxStyle.p}}  variant='subtitle2'>
              Производитель
            </Typography>
            <Stack sx={{...checkBoxStyle.stack}} direction="row">
              <Checkbox  sx={{ '&.Mui-checked': { color: colors.black } }} />
              <Typography variant='subtitle2'>Все</Typography>
            </Stack>
            <Stack sx={{...checkBoxStyle.stack}} direction="row">
              <Checkbox sx={{ '&.Mui-checked': { color: colors.black } }} />
              <Typography variant='subtitle2'>Apple (1501)</Typography>
            </Stack>
            <Stack sx={{...checkBoxStyle.stack}} direction="row">
              <Checkbox sx={{ '&.Mui-checked': { color: colors.black } }} />
              <Typography variant='subtitle2'>Samsung (1501)</Typography>
            </Stack>
            <Stack sx={{...checkBoxStyle.stack}} direction="row">
              <Checkbox sx={{ '&.Mui-checked': { color: colors.black } }} />
              <Typography variant='subtitle2'>DELL (1501)</Typography>
            </Stack>
            <Button sx={{height:'40px'}}>
                <ArrowDow color='#000'/>
            </Button>
          </Stack>
        </Stack>

        <Stack sx={{ padding: '1rem 0.5rem' }} gap={2}>
          <Select
            //@ts-expect-error
            onChange={(e) => dispatch(sortFn({ direction: e.target.value }))}
            value={sort?.direction}
            placeholder="Сортировка"
          >
            <MenuItem value={OrderDirection.Asc}>Сначала по дешевле</MenuItem>
            <MenuItem value={OrderDirection.Desc}>Сначала по дороже</MenuItem>
          </Select>
          <Accordion sx={{ border: '1px solid #e5e5e5' }}>
            <AccordionSummary>
              <Typography variant="subtitle2">Цена</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack alignItems="center" gap={2} direction="row">
                <Input
                  value={price.gte || 0}
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(
                      changePrice({
                        type: 'gte',
                        value: parseInt(e.target.value),
                      })
                    )
                  }
                  size="small"
                />
                <Box
                  sx={{
                    background: colors.grey.light,
                    height: '2px',
                    width: '1.5rem',
                  }}
                />
                <Input
                  value={price.lte || 0}
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(
                      changePrice({
                        type: 'lte',
                        value: parseInt(e.target.value),
                      })
                    )
                  }
                  size="small"
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
          {/* {attributes?.map((attr) => (
            <FilterItem
              key={attr.id}
              name={attr.name}
              id={attr.id}
              slug={attr.slug}
            />
          ))} */}
        </Stack>
      </Grid>
      <Grid item md={9} lg={9}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Filter;
