import {
  Badge,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Cart from 'components/icons/cart';
import Heart from 'components/icons/heart';
import Phone from 'components/icons/phone';
import Profile from 'components/icons/profile';
import { Paths } from 'config/site-paths';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useAppSelector } from 'redux-state/hook';
import { headerTopLinks } from '../header.data';
import LogoImage from 'assets/logosvg.svg';
import styled from 'styled-components';

const LogoLink = styled.a`
  display: block;
  span {
    display: block;
    max-width: 50px;
    max-height: 50px;
  }
`;
interface HeadeButtonsProps {
  onProfileIconClick: () => void;
  isAuthenticated?: boolean;
}

const MobileHeaderButtons: React.FC<HeadeButtonsProps> = ({
  onProfileIconClick,
  isAuthenticated,
}) => {
  const { productsCount } = useAppSelector((state) => state.cart);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { productsCount: likedProductsCount } = useAppSelector(
    (state) => state.like
  );

  return (
    <List>
      <Stack direction="row" justifyContent="center">
        <Link href="/">
          <LogoLink>
            <Image layout="fixed" src={LogoImage} alt="logo" />
          </LogoLink>
        </Link>
      </Stack>
      <ListItem onClick={onProfileIconClick} button>
        <ListItemIcon>
          <Profile />
        </ListItemIcon>
        <ListItemText>{isAuthenticated ? 'Профиль' : 'Войти'} </ListItemText>
      </ListItem>
      <Link href={Paths.LIKES}>
        <ListItem button>
          <ListItemIcon>
            <Badge
              color="secondary"
              overlap="circular"
              badgeContent={likedProductsCount}
              // @ts-expect-error
              invisible={likedProductsCount && likedProductsCount < 1}
              max={99}
            >
              <Heart />
            </Badge>
          </ListItemIcon>
          <ListItemText>Избранное</ListItemText>
        </ListItem>
      </Link>
      <Link href={Paths.CART}>
        <ListItem button>
          <ListItemIcon>
            <Badge
              color="secondary"
              overlap="circular"
              badgeContent={productsCount}
              // @ts-expect-error
              invisible={productsCount && productsCount < 1}
              max={99}
            >
              <Cart />
            </Badge>
          </ListItemIcon>
          <ListItemText>Корзина</ListItemText>
        </ListItem>
      </Link>
      <Divider />
      {isMobile && (
        <List>
          {headerTopLinks.map((top, i) => (
            <ListItem button key={top.label}>
              {i === headerTopLinks.length - 1 && (
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
              )}
              <Link href={top.link}>
                <ListItemText>{top.label}</ListItemText>
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </List>
  );
};

export default MobileHeaderButtons;
