import { Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import {
  FooterLink,
  FooterTopWrapper,
  FooterBottomWrapper,
  Logo,
  SocialMediaIcon,
  CartWrapper,
} from './footer.styles';
import LogoImage from 'assets/logo.svg';
import {
  aboutSite,
  siteInfo,
  socialMediaLinks,
  useFullLinks,
} from './footer-data';
import Link from 'next/link';
import UzCard from 'assets/png/uzcard.png';
import Humo from 'assets/png/humo.png';

const Footer = () => {
  return (
    <>
      <FooterTopWrapper>
        <Container maxWidth="xl">
          <Grid container rowSpacing={4}>
            <Grid sm={6} xs={12} item lg={3}>
              <Stack spacing={2}>
                <Logo>
                  <Link href='/'>
                    <Image layout="fixed" src={LogoImage} alt="logo" />
                  </Link>
                </Logo>
                <Stack>
                  <Typography fontSize={21}>+99 893 374-66-44</Typography>
                  <Typography fontSize={14}>справочная служба</Typography>
                </Stack>
                <Stack>
                  <Typography fontSize={21}>+99 890 253-77-53</Typography>
                  <Typography fontSize={14}>интернет-магазин</Typography>
                </Stack>
                <Stack>
                  <Typography fontSize={14} fontWeight={600}>
                    Оставайтесь на связи
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  {socialMediaLinks.map((links) => (
                    <a key={links.link} href={links.link}>
                      <SocialMediaIcon>
                        <Image
                          src={links.image}
                          layout="fixed"
                          alt="facebook"
                        />
                      </SocialMediaIcon>
                    </a>
                  ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Stack spacing={2}>
                {useFullLinks.map((info) => (
                  <Link key={info.label} href={info.link}>
                    <FooterLink key={info.label}>{info.label}</FooterLink>
                  </Link>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Stack spacing={2}>
                {aboutSite.map((info) => (
                  <Link key={info.label} href={info.link}>
                    <FooterLink key={info.label}>{info.label}</FooterLink>
                  </Link>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Stack spacing={2}>
                {siteInfo.map((info) => (
                  <Link key={info.label} href={info.link}>
                    <FooterLink key={info.label}>{info.label}</FooterLink>
                  </Link>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </FooterTopWrapper>
      <FooterBottomWrapper>
        <Container maxWidth="xl">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <FooterLink>
              © 2022 Любое использование контента без письменного разрешения
              запрещено
            </FooterLink>
            <Stack spacing={2} direction="row">
              <CartWrapper>
                <Image src={UzCard} layout="fixed" alt="uzcard" />
              </CartWrapper>
              <CartWrapper>
                <Image src={Humo} layout="fixed" alt="humo" />
              </CartWrapper>
            </Stack>
          </Stack>
        </Container>
      </FooterBottomWrapper>
    </>
  );
};

export default Footer;
