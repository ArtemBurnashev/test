import {
  Badge,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Cart from 'components/icons/cart';
import Heart from 'components/icons/heart';
import Phone from 'components/icons/phone';
import Profile from 'components/icons/profile';
import { Paths } from 'config/site-paths';
import Link from 'next/link';
import React from 'react';
import { useAppSelector } from 'redux-state/hook';
import { headerTopLinks } from '../header.data';

const MobileHeaderButtons = () => {
  const { productsCount } = useAppSelector((state) => state.cart);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <List>
      <ListItem button>
        <ListItemIcon>
          <Profile />
        </ListItemIcon>
        <ListItemText>Профиль</ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Heart />
        </ListItemIcon>
        <ListItemText>Избранное</ListItemText>
      </ListItem>
      <Link href={Paths.CART}>
        <ListItem button>
          <ListItemIcon>
            <Badge
              color="secondary"
              overlap="circular"
              badgeContent={productsCount}
              invisible={productsCount < 1}
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
