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
import LogoImage from 'assets/logo.svg';
import { Button } from 'components/button';
import { headerTopLinks } from './header.data';
import HeaderButtons from './components/header-buttons';
import { Sidebar } from 'layouts/sidebar';
import MobileHeaderButtons from './components/mobile-header-buttons';
import { Burger } from 'components/burger';
import SearchField from './components/search-field';
import { MobileStack } from './header.styles';
import Login from './components/auth/login';
import { useAppDispatch, useAppSelector } from 'redux-state/hook';
import { useRouter } from 'next/router';
import { Paths } from 'config/site-paths';
import { useModal } from 'hooks/use-modal';
import Catalog from './components/catalog';
import { CatologButton } from './header.styles';
import { BurgerMenu } from 'components/icons/Burger-menu';
import Close from 'components/icons/close';
import Hamburger from 'components/icons/hamburger';
import Auth from './components/auth';
import { CategoryNavbar } from 'components/category-navbar';
import { toggle } from 'redux-state/features/sidebar';
import HeaderMobille from './header-mobille';


const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const catalogModal = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const { isOpen: showLoginMenu } = useAppSelector(state => state.sidebar);
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const mediaQuery = useMediaQuery('(max-width:768px)');
  const lg = useMediaQuery('(max-width:1321px)');

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
      dispatch(toggle(open));
    };

  useEffect(() => {
    catalogModal.close();
  }, [router.query]);
  const styles = {
    position: 'fixed',
    zIndex: '11',
    right: '0',
    left: '0',
    top: '0',
  }
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if(isMobile){
    return <HeaderMobille />
  }
  return (
    <>
      <Box
        sx={
          router.asPath === '/'
            ? { backgroundColor: '#fff', ...styles }
            : { backgroundColor: '#FCFCFC', ...styles }
        }
      >
        {isMobile &&
          <MobileHeaderButtons
            isAuthenticated={isAuthenticated}
            onProfileIconClick={() =>
              isAuthenticated
                ? router.push(Paths.PROFILE)
                : dispatch(toggle(!showLoginMenu))
            }
          />
        }
        <Box sx={{ backgroundColor: '#FCFCFC' }}>
          <Container maxWidth="xl">
            {!isMobile && (
              <>
                {scrollPosition < 53 &&
                  <Stack
                    direction="row"
                    spacing={4}
                    padding="8px 0"
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
                }

              </>


            )}
          </Container>
        </Box>
        <Container maxWidth="xl">
          <Dialog
            scroll="paper"
            maxWidth="lg"
            open={catalogModal.isOpen}
            onClose={catalogModal.close}
            sx={{ width: '100%' }}
          >
            <Catalog />
          </Dialog>
          <Stack sx={{ ['.gbjXkt']: { width: '100%' }, ['.header__inner']: { width: '100%' } }} width='100%'>
            <Stack
              width={{ md: '100%' }}
              direction="row"
              alignItems="center"
              gap={'53px'}
              padding={{ md: "18px 0", xs: "0 0 18px" }}
              className='header__inner'

            >
              <MobileStack direction="row" >
                {isSmallDevice || (
                  <Link href="/">
                    <Logo>
                      <Image layout="fixed" src={LogoImage} alt="logo" />
                    </Logo>
                  </Link>
                )}
                <Stack width='100%' direction="row" spacing={2} alignItems="center">
                  <CatologButton>
                    <Button
                      className={''}
                      sx={{
                        '&&&&&.MuiButtonBase-root': {
                          pl: (!mediaQuery ? '3rem' : 0),
                          pr: (!mediaQuery ? '3rem' : 0),
                        },
                      }}
                      variant="contained"
                      startIcon={!mediaQuery && (catalogModal.isOpen ? <Close /> : <Hamburger />)}
                      onClick={() => catalogModal.toggle()}
                    >
                      {!mediaQuery ? 'Каталог' : <BurgerMenu />}
                    </Button>
                  </CatologButton>


                  <SearchField />
                  {/* {isMobile && <Burger open={isOpen} setOpen={setIsOpen} />} */}
                </Stack>
              </MobileStack>

              {!isMobile && (
                <HeaderButtons
                  isAuthenticated={isAuthenticated}
                  onProfileIconClick={() =>
                    isAuthenticated
                      ? router.push(Paths.PROFILE)
                      : dispatch(toggle(!showLoginMenu))
                  }
                />
              )}
            </Stack>


            {!isAuthenticated && (
              <Sidebar
                isOpen={showLoginMenu}
                toggleDrawer={toggleLoginMenu}
              >
                <Box sx={{ position: 'relative' }}>
                  <IconButton
                    onClick={() => dispatch(toggle(false))}
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
        {scrollPosition < 53 && <CategoryNavbar />}
      </Box>
      {lg ?
        <Stack mb={router.asPath === '/' ? '127px' : '201px'} />
        :
        <Stack mb={router.asPath === '/' ? '127px' : '190px'} />
      }
    </>

  );
};

export default Header;
