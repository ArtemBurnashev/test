import { Container, Grid, Stack, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
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
import { FooterIcon } from 'components/icons/footer-icon';
import UzCard from 'assets/png/uzcard.png';
import { useMediaQuery } from '@mui/material';
import { HumoIcon } from 'components/icons/humo-icon';
import colors from 'config/theme';

const Footer = () => {
  const querys = useMediaQuery('(max-width:768px)');

  return (
    <>
      <FooterTopWrapper>
        <Container maxWidth="xl">
          <Grid container rowSpacing={4}>
            <Grid sm={6} xs={12} item lg={3}>
              <Stack spacing={2}>
                <Logo>
                  <Link href="/">
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
            {!querys ?
              <>
                <Grid item xs={12} sm={6} lg={3}>
                  <Stack spacing={2}>
                    
                    {useFullLinks.map((info) => (
                      <Link passHref key={info.label} href={info.link}>
                        <Typography sx={{":hover":{color:colors.primary.hover}}} component="a" variant="body1" key={info.label}>
                          {info.label}
                        </Typography>
                      </Link>
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Stack spacing={2}>
                    {aboutSite.map((info) => (
                      <Link passHref key={info.label} href={info.link}>
                        <Typography sx={{":hover":{color:colors.primary.hover}}} variant="body1" component="a" key={info.label}>
                          {info.label}
                        </Typography>
                      </Link>
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Stack spacing={2}>
                    {siteInfo.map((info) => (
                      <Link passHref key={info.label} href={info.link}>
                        <Typography sx={{":hover":{color:colors.primary.hover}}} variant="body1" component="a" key={info.label}>
                          {info.label}
                        </Typography>
                      </Link>
                    ))}
                  </Stack>
                </Grid>
              </> :
              <>
                <Grid item mt={'30px'} xs={12}>
                  <Accordion sx={{backgroundColor:'transparent',boxShadow:'none'}}>
                    <AccordionSummary
                      expandIcon={<FooterIcon />}
                     aria-controls="panel1a-footer"
                     id="panel1a-footer"
                    >
                      <Typography>О магазине</Typography>
                    </AccordionSummary>

                    {useFullLinks.map((info) => (
                      <AccordionDetails key={info.label}>
                        <Link passHref href={info.link}>
                          <Typography sx={{":hover":{color:colors.primary.hover}}} component="a" variant="body1" key={info.label}>
                            {info.label}
                          </Typography>
                        </Link>
                      </AccordionDetails>
                    ))}

                  </Accordion>
                </Grid>
                <Grid item xs={12}>
                  <Accordion sx={{backgroundColor:'transparent',boxShadow:'none'}}>
                    <AccordionSummary
                      expandIcon={<FooterIcon />}
                     aria-controls="panel1a-footer"
                     id="panel1a-footer"
                    >
                      <Typography>Клиентам</Typography>
                    </AccordionSummary>

                    {aboutSite.map((info) => (
                      <AccordionDetails key={info.label}>
                        <Link passHref href={info.link}>
                          <Typography sx={{":hover":{color:colors.primary.hover}}} component="a" variant="body1" key={info.label}>
                            {info.label}
                          </Typography>
                        </Link>
                      </AccordionDetails>
                    ))}

                  </Accordion>
                </Grid>
                <Grid item xs={12}>
                  <Accordion sx={{backgroundColor:'transparent',boxShadow:'none'}}>
                    <AccordionSummary
                      expandIcon={<FooterIcon />}
                     aria-controls="panel1a-footer"
                     id="panel1a-footer"
                    >
                      <Typography>Информация</Typography>
                    </AccordionSummary>

                    {siteInfo.map((info) => (
                      <AccordionDetails key={info.label}>
                        <Link passHref href={info.link}>
                          <Typography sx={{":hover":{color:colors.primary.hover}}} component="a" variant="body1" key={info.label}>
                            {info.label}
                          </Typography>
                        </Link>
                      </AccordionDetails>
                    ))}

                  </Accordion>
                </Grid>
              </>
            }

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
                <Image src={UzCard} alt='uzcard'/>
              </CartWrapper>
              <CartWrapper>
                <HumoIcon />
              </CartWrapper>
            </Stack>
          </Stack>
        </Container>
      </FooterBottomWrapper>
    </>
  );
};

export default Footer;
