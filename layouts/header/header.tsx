import {
  Container,
  Stack,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Modal,
  Dialog,
} from '@mui/material';
import Phone from 'components/icons/phone';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Logo } from './header.styles';
import LogoImage from 'assets/png/logo.png';
import { Button } from 'components/button';
import { headerTopLinks } from './header.data';
import HeaderButtons from './components/header-buttons';
import { Sidebar } from 'layouts/sidebar';
import MobileHeaderButtons from './components/mobile-header-buttons';
import { Burger } from 'components/burger';
import SearchField from './components/search-field';
import Login from './components/login';
import { useAppSelector } from 'redux-state/hook';
import { useRouter } from 'next/router';
import { Paths } from 'config/site-paths';
import { useModal } from 'hooks/use-modal';
import Catalog from './components/catalog';
import Close from 'components/icons/close';
import Hamburger from 'components/icons/hamburger';
import { CategoryNavbar } from 'components/category-navbar';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const catalogModal = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.user);

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
            >
              {headerTopLinks.map((top, i) => (
                <Link key={top.label} href={top.link}>
                  {i === headerTopLinks.length - 1 ? (
                    <Stack spacing={2} direction="row" alignItems="center">
                      <Phone />
                      <Typography variant="subtitle2">{top.label}</Typography>
                    </Stack>
                  ) : (
                    <Typography variant="subtitle2">{top.label}</Typography>
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
            <Link href="/">
              <a>
                <Logo>
                  <Image layout="fixed" src={LogoImage} alt="logo" />
                </Logo>
              </a>
            </Link>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              {!isSmallDevice && (
                <Button
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
                </Button>
              )}

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
            <MobileHeaderButtons />
          </Sidebar>
          {!isAuthenticated && (
            <Sidebar
              width={450}
              isOpen={showLoginMenu}
              toggleDrawer={toggleLoginMenu}
            >
              <Login />
            </Sidebar>
          )}
        </Stack>
      </Container>
      <CategoryNavbar/>
    </Box>
  );
};

export default Header;
