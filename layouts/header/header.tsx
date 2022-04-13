import {
  Container,
  Stack,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Modal,
  Dialog,
  IconButton,
} from '@mui/material';
import Phone from 'components/icons/phone';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Logo } from './header.styles';
import LogoImage from 'assets/logo.png';
import { Button } from 'components/button';
import { headerTopLinks } from './header.data';
import HeaderButtons from './components/header-buttons';
import { Sidebar } from 'layouts/sidebar';
import MobileHeaderButtons from './components/mobile-header-buttons';
import { Burger } from 'components/burger';
import SearchField from './components/search-field';
import Login from './components/auth/login';
import { useAppSelector } from 'redux-state/hook';
import { useRouter } from 'next/router';
import { Paths } from 'config/site-paths';
import { useModal } from 'hooks/use-modal';
import Catalog from './components/catalog';
import Close from 'components/icons/close';
import Hamburger from 'components/icons/hamburger';
import Auth from './components/auth';
import { CategoryNavbar } from 'components/category-navbar';
import styled from 'styled-components';


const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const catalogModal = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const CatologButton = styled(Button)`
    animation-name: butonOpacity;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    transition: all 0.3s ease-in-out;
    border: 1px solid #FEEE00;

    @keyframes butonOpacity {
      0%{
        background-color: #FEEE00;
      }
      50%{
        background-color: #feed004e;
      }
      100%{
        background-color: #FEEE00;
      }
    }
    &:hover{
      animation: none;
    }
  `

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsOpen(open);
    };
  const toggleLoginMenu =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setShowLoginMenu(open);
    };

  useEffect(() => {
    catalogModal.close();
  }, [router.query]);

  return (
    <Box sx={{ backgroundColor: '#FCFCFC' }}>
      <Container maxWidth="xl">
        <Dialog
          scroll="paper"
          maxWidth="lg"
          open={catalogModal.isOpen}
          onClose={catalogModal.close}
        >
          <Catalog />
        </Dialog>
        <Stack>
          {!isMobile && (
            <Stack
              direction="row"
              spacing={4}
              padding="1rem 0"
              justifyContent="flex-end"
              sx={{ backgroundColor: '#FCFCFC' }}
            >
              {headerTopLinks.map((top, i) => (
                <Link passHref key={top.label} href={top.link}>
                  {i === headerTopLinks.length - 1 ? (
                    <Stack
                      component="a"
                      spacing={2}
                      direction="row"
                      alignItems="center"
                    >
                      <Phone />
                      <Typography variant="subtitle2">{top.label}</Typography>
                    </Stack>
                  ) : (
                    <Typography component="a" variant="subtitle2">
                      {top.label}
                    </Typography>
                  )}
                </Link>
              ))}
            </Stack>
          )}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            padding="1rem 0"
          >
            {isSmallDevice || (
              <Link href="/">
                <a>
                  <Logo>
                    <Image layout="fixed" src={LogoImage} alt="logo" />
                  </Logo>
                </a>
              </Link>
            )}

            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <CatologButton
                className={''}
                sx={{
                  '&&&&&.MuiButtonBase-root': {
                    pl: '3rem',
                    pr: '3rem',
                  },
                }}
                variant="contained"
                startIcon={catalogModal.isOpen ? <Close /> : <Hamburger />}
                onClick={() => catalogModal.toggle()}
              >
                Каталог
              </CatologButton>

              <SearchField />
              {isMobile && <Burger open={isOpen} setOpen={setIsOpen} />}
            </Stack>
            {!isMobile && (
              <HeaderButtons
                isAuthenticated={isAuthenticated}
                onProfileIconClick={() =>
                  isAuthenticated
                    ? router.push(Paths.PROFILE)
                    : setShowLoginMenu(!showLoginMenu)
                }
              />
            )}
          </Stack>
          <Sidebar isOpen={isOpen} toggleDrawer={toggleDrawer}>
            <MobileHeaderButtons
              isAuthenticated={isAuthenticated}
              onProfileIconClick={() =>
                isAuthenticated
                  ? router.push(Paths.PROFILE)
                  : setShowLoginMenu(!showLoginMenu)
              }
            />
          </Sidebar>
          {!isAuthenticated && (
            <Sidebar
              width={450}
              isOpen={showLoginMenu}
              toggleDrawer={toggleLoginMenu}
            >
              <Box sx={{ position: 'relative' }}>
                <IconButton
                  onClick={() => setShowLoginMenu(false)}
                  sx={{ position: 'absolute', top: '-2rem', right: '1rem' }}
                >
                  <Close />
                </IconButton>
                <Auth />
              </Box>
            </Sidebar>
          )}
        </Stack>
      </Container>
      <CategoryNavbar />
    </Box>
  );
};

export default Header;
