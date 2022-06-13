import {
  Badge,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
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
import { useRouter } from 'next/router';
import { useAppSelector } from 'redux-state/hook';
import { headerTopLinks } from '../header.data';
import LogoImage from 'assets/logo.svg';
import styled from 'styled-components';
import colors from 'config/theme';

const LogoLink = styled.a`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  span {
    display: block;
    max-width: 140px;
    max-height: 51px;
  }
`;
interface HeadeButtonsProps {
  onProfileIconClick: () => void;
  isAuthenticated?: boolean;
}
const RowStack = styled(Stack)`
  display: flex;
  align-items: center;
  height: 70px;
  position: relative;
  padding: 0 10px;
  justify-content: space-between;
  .rowsatck__item{
    width: 51px;
    display: block;
  }
`
const styleSpecialOrder = {
  position: 'fixed',
  top: '60%',
  bgcolor: colors.primary.default,
  right: '-25px',
  zIndex: '100',
  p: '5px',
  transform: 'rotate(90deg)'
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
  const router = useRouter();
  const specialOrder = () => {
    if (!isAuthenticated) {
      onProfileIconClick()
    }
    router.push(Paths.SPECIAL_ORDER);
  }

  return (
    <RowStack direction='row'>
      {router.asPath !== '/special-order' &&
        <Stack onClick={specialOrder} sx={{ ...styleSpecialOrder }}>
          <Typography variant='body1'>Cпецзаказ</Typography>
        </Stack>
      }
      <Stack p='10px' onClick={onProfileIconClick}>
        <Profile />
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Link href="/">
          <LogoLink>
            <Image layout="fixed" src={LogoImage} alt="logo" />
          </LogoLink>
        </Link>
      </Stack>
      <Stack direction='row' alignItems='center'>
        <Link href={Paths.LIKES}>
          <Stack p='10px'>
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
          </Stack>
          {/* <ListItemText>Избранное</ListItemText> */}
        </Link>
        <Link href={Paths.CART}>
          <Stack p='10px'>
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
          </Stack>
        </Link>
      </Stack>

      {/* <Divider /> */}
      {/* {isMobile && (
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
      )} */}
    </RowStack>
  );
};

export default MobileHeaderButtons;
