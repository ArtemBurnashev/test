import {
  AccordionDetails,
  Box,
  Button,
  Checkbox,
  Grid,
  MenuItem,
  Stack,
  Typography,
  InputAdornment
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
import React, { useEffect } from 'react';
import {
  changePrice,
  clearFilters,
  filterAttributes,
  sort as sortFn,
} from 'redux-state/features/filter';
import { useAppDispatch, useAppSelector } from 'redux-state/hook';
import ArrowDow from 'components/icons/arrow-down';
import { CurensyIcon } from 'components/icons/curensy-icon';
import { useRouter } from 'next/router';

const Filter: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { slug } = router.query;

  const { price, sort } = useAppSelector((state) => state.filter);
  const { data } = useInitialProductFilterAttributesQuery({
    variables: {
      slug: Array.isArray(slug) ? slug[0] : slug || '',
    },
  });
  const parentCategory = data?.category?.parent;

  const attributes = data?.category?.products?.edges.map((edge) => edge.node);

  const onlyBrend = data?.category?.products?.edges.map((i) => {
    if (i.node.productType.productAttributes) {
      return i.node.productType.productAttributes[0]
    }
  })
  console.log(onlyBrend);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    slug?: string | null
  ) => {
    if (slug) {
      dispatch(
        filterAttributes({
          slug,
          values: [event.target.name],
        })
      );
    }
  };

  const checkBoxStyle = {
    stack: {
      transition: '.3s',
      borderBottom: '0.5px solid #DCDCDC',
      ':hover': { bgcolor: colors.primary.default },
      p: '8px 0',
      alignItems: 'center',
    },
    p: {
      fontWeight: '500',
      p: '16px 12px',
      borderBottom: '0.5px solid #DCDCDC',
    },
  };

  useEffect(() => {
    dispatch(clearFilters())
  }, [router.asPath])


  return (
    <Grid container>
      <Grid item md={3} lg={3}>
        <Stack sx={{ padding: '1rem 0.5rem' }}>
          <Stack border="0.5px solid #DCDCDC">
            {!parentCategory ? <>
              {onlyBrend?.map((attr) => (
                <>
                  <Typography sx={{ ...checkBoxStyle.p }} variant="subtitle2">
                    {attr?.name}
                  </Typography>
                  {attr?.choices?.edges.map((edge) => (
                    <Stack
                      key={edge.node.id}
                      sx={{ ...checkBoxStyle.stack }}
                      direction="row"
                    >
                      <Checkbox
                        sx={{ '&.Mui-checked': { color: colors.black } }}
                        value={edge.node.id}
                        name={edge.node.slug || edge.node.name?.toLocaleLowerCase()}
                        onChange={(e) =>
                          handleCheckboxChange(e, attr.slug)
                        }
                      />
                      <Typography variant="subtitle2">
                        {edge.node.name}
                      </Typography>
                    </Stack>
                  ))}
                </>

              ))}
            </>
              :
              <>
                {attributes?.map((attr) =>
                  attr.productType.productAttributes?.map((productType) => (
                    <>
                      <Typography sx={{ ...checkBoxStyle.p }} variant="subtitle2">
                        {productType?.name}
                      </Typography>
                      {productType?.choices?.edges.map((edge) => (
                        <Stack
                          key={edge.node.id}
                          sx={{ ...checkBoxStyle.stack }}
                          direction="row"
                        >
                          <Checkbox
                            sx={{ '&.Mui-checked': { color: colors.black } }}
                            value={edge.node.id}
                            name={edge.node.slug || edge.node.name?.toLocaleLowerCase()}
                            onChange={(e) =>
                              handleCheckboxChange(e, productType.slug)
                            }
                          />
                          <Typography variant="subtitle2">
                            {edge.node.name}
                          </Typography>
                        </Stack>
                      ))}
                    </>
                  ))
                )}
              </>
            }
            <Button sx={{ height: '40px' }}>
              <ArrowDow color="#000" />
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
                  startAdornment={
                    <InputAdornment position='start'>
                      <CurensyIcon />
                    </InputAdornment>
                  }
                  placeholder={`${price.gte || 0}`}
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
                  startAdornment={
                    <InputAdornment position='start'>
                      <CurensyIcon />
                    </InputAdornment>
                  }
                  placeholder={`${price.lte || 0}`}
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
