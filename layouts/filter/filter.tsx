import {
  AccordionDetails,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  SelectChangeEvent,
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
import FilterItem from './filter-item';

const Filter: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const { price, sort } = useAppSelector((state) => state.filter);
  const { data } = useInitialProductFilterAttributesQuery();
  const attributes = data?.attributes?.edges.map((edge) => edge.node);
  return (
    <Grid container>
      <Grid item md={7} lg={9}>
        {children}
      </Grid>
      <Grid item md={5} lg={3}>
        <Stack sx={{ padding: '1rem 0.5rem' }} gap={2}>
          <Select
            //@ts-expect-error
            onChange={(e) => dispatch(sortFn({ direction: e.target.value }))}
            value={sort?.direction}
            placeholder="Сортировка"
          >
            <MenuItem value={OrderDirection.Asc}>O'sish</MenuItem>
            <MenuItem value={OrderDirection.Desc}>Kamayish</MenuItem>
          </Select>
          <Accordion>
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
          {attributes?.map((attr) => (
           <FilterItem key={attr.id} name={attr.name} id={attr.id} slug={attr.slug} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Filter;
