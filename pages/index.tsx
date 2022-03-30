import { Box, Container, Grid, Typography } from '@mui/material';
import { Action } from 'components/action';
import { CategoyrCarousel } from 'components/carousel/category-carousel';
import { BannerCarousel } from 'components/carousel/img-carousel';
import { ProductCarousel } from 'components/carousel/product-carousel';
import { PopularBrands } from 'components/popular-brands';
import { ProductColumn } from 'components/product-column';
import { Main } from 'layouts/main';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Main>
      <Box maxWidth="2000px" margin="0 auto">
        <BannerCarousel height={301} />
      </Box>
      <Container maxWidth="xl">
        <CategoyrCarousel />
        <ProductCarousel label="Смартфоны и планшеты" />
        <Action />
        <Grid columnSpacing={4} container>
          <Grid item xs={4}>
            <ProductColumn label="Смартфоны и планшеты" />
          </Grid>
          <Grid item xs={4}>
            <ProductColumn label="Ноутбуки, планшеты и компьютеры" />
          </Grid>
          <Grid item xs={4}>
            <ProductColumn label="Смартфоны и планшеты" />
          </Grid>
        </Grid>
        <ProductCarousel label="Смартфоны и планшеты" />
        <ProductCarousel label="Ноутбуки, планшеты и компьютеры" />
        <Typography margin="1rem 0" variant="h2" fontWeight={600}>
          Популярные бренды
        </Typography>
        <PopularBrands />
      </Container>
    </Main>
  );
};

export default Home;
