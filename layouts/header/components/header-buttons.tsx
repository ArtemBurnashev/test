import { Badge, Stack, Typography } from '@mui/material';
import Cart from 'components/icons/cart';
import Heart from 'components/icons/heart';
import Profile from 'components/icons/profile';
import { Paths } from 'config/site-paths';
import Link from 'next/link';
import React from 'react';
import { useAppSelector } from 'redux-state/hook';
import styled from 'styled-components';

interface HeadeButtonsProps {
  onProfileIconClick: () => void;
  isAuthenticated?: boolean;
}


const HeaderButtons: React.FC<HeadeButtonsProps> = ({
  onProfileIconClick,
  isAuthenticated,
}) => {
  const { productsCount } = useAppSelector((state) => state.cart);
  const { productsCount: likedProductsCount } = useAppSelector(state => state.like)
 

  return (
    <Stack sx={{ flexGrow: 1, width: '100%', justifyContent: 'end' }} direction="row" spacing={4}>
      <Stack
        onClick={onProfileIconClick}
        sx={{ cursor: 'pointer' }}
        alignItems="center"
      >
        <Profile />
        <Typography variant="subtitle2">
          {isAuthenticated ? 'Профиль' : 'Войти'}{' '}
        </Typography>
      </Stack>
      <Link href={Paths.LIKES}>
        <Stack sx={{ cursor: 'pointer' }} alignItems="center">
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
          <Typography variant="subtitle2">Избранное</Typography>
        </Stack>
      </Link >
      <Link href={Paths.CART}>
        <Stack sx={{ cursor: 'pointer' }} alignItems="center">
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
          <Typography variant="subtitle2">Корзина</Typography>
        </Stack>
      </Link>
    </Stack >
  );
};

export default HeaderButtons;
