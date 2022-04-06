import { Badge, Stack, Typography } from '@mui/material';
import Cart from 'components/icons/cart';
import Heart from 'components/icons/heart';
import Profile from 'components/icons/profile';
import { Paths } from 'config/site-paths';
import Link from 'next/link';
import React from 'react';
import { useAppSelector } from 'redux-state/hook';

interface HeadeButtonsProps {
  onProfileIconClick: () => void;
  isAuthenticated?: boolean;
}

const HeaderButtons: React.FC<HeadeButtonsProps> = ({
  onProfileIconClick,
  isAuthenticated,
}) => {
  const { productsCount } = useAppSelector((state) => state.cart);

  return (
    <Stack direction="row" spacing={4}>
      <Stack
        onClick={onProfileIconClick}
        sx={{ cursor: 'pointer' }}
        alignItems="center"
      >
        <Profile />
        <Typography variant="subtitle2">
          {isAuthenticated ? 'Профиль' : 'Kirish'}{' '}
        </Typography>
      </Stack>
      <Stack sx={{ cursor: 'pointer' }} alignItems="center">
        <Heart />
        <Typography variant="subtitle2">Избранное</Typography>
      </Stack>
      <Link href={Paths.CART}>
        <Stack sx={{ cursor: 'pointer' }} alignItems="center">
          <Badge
            color="secondary"
            overlap="circular"
            badgeContent={productsCount}
            invisible={productsCount < 1}
            max={99}
          >
            <Cart />
          </Badge>
          <Typography variant="subtitle2">Корзина</Typography>
        </Stack>
      </Link>
    </Stack>
  );
};

export default HeaderButtons;
