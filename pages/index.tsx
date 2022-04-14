import { Box, Container, Grid, Typography, Backdrop, CircularProgress } from '@mui/material';
import { Action } from 'components/action';
import { CategoyrCarousel } from 'components/carousel/category-carousel';
import { BannerCarousel } from 'components/carousel/img-carousel';
import { ProductCarousel } from 'components/carousel/product-carousel';
import { PopularBrands } from 'components/popular-brands';
import { ProductColumn } from 'components/product-column';
import { useAllCategoriesQuery } from 'graphql/generated.graphql';
import { useModal } from 'hooks/use-modal';
import { Main } from 'layouts/main';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const { data: categoryData } = useAllCategoriesQuery({ variables: { first: 10, cursor: "" } });
  const nodes = categoryData?.categories?.edges.map((edge) => edge.node);
  const { isOpen: productIsopen, open: productOpen } = useModal()


  return (
    <Main>
      <Box maxWidth="2000px" margin="0 auto">
        <BannerCarousel height={301} />
      </Box>
      <Container maxWidth="xl">
        <CategoyrCarousel />
        <ProductCarousel
          modalOpen={productOpen}
          slug={nodes ? nodes[0].slug : ''}
          label={nodes ? nodes[0].name : ''}
        />
      </Container>
      <Action />
      <Container maxWidth="xl">
        <Grid columnSpacing={4} container>
          <Grid item md={6} lg={4}>
            <ProductColumn
              modalOpen={productOpen}
              slug={nodes ? nodes[1].slug : ''}
              label={nodes ? nodes[1].name : ''}
            />
          </Grid>
          <Grid item md={6} lg={4}>
            <ProductColumn
              modalOpen={productOpen}
              slug={nodes ? nodes[1].slug : ''}
              label={nodes ? nodes[1].name : ''}
            />
          </Grid>
          <Grid item md={6} lg={4}>
            <ProductColumn
              modalOpen={productOpen}
              slug={nodes ? nodes[3].slug : ''}
              label={nodes ? nodes[3].name : ''}
            />
          </Grid>
        </Grid>
        <ProductCarousel
          modalOpen={productOpen}
          slug={nodes ? nodes[4].slug : ''}
          label={nodes ? nodes[4].name : ''}
        />
        <ProductCarousel
          modalOpen={productOpen}
          slug={nodes ? nodes[5].slug : ''}
          label={nodes ? nodes[5].name : ''}
        />
        <Typography margin="1rem 0" variant="h2" fontWeight={600}>
          Популярные бренды
        </Typography>
        <PopularBrands />
      </Container>
      <Backdrop
        sx={{ color: '#FEEE00', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={productIsopen}
      >
        <CircularProgress color='primary' />
      </Backdrop>
    </Main>
  );
};

export default Home;
