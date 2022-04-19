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
import LogoImage from 'assets/logo.svg';
import styled from 'styled-components';

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
  justify-content: space-between;
  .rowsatck__item{
    width: 55px;
  }
`

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

  const [likeBadge, setLikeBadge] = React.useState({});
  const [countBadge, setCountBadge] = React.useState({});
  React.useEffect(() => {
    likedProductsCount ?
      setLikeBadge({ ['.MuiBadge-badge']: { backgroundColor: '#E44542' } }) :
      setLikeBadge({ ['.MuiBadge-badge']: { backgroundColor: 'transparent', color: 'transparent' } });
    productsCount ?
      setCountBadge({ ['.MuiBadge-badge']: { backgroundColor: '#E44542' } }) :
      setCountBadge({ ['.MuiBadge-badge']: { backgroundColor: 'transparent', color: 'transparent' } });
  }, [likedProductsCount, productsCount])

  return (
    <RowStack direction='row'>

      <ListItem className='rowsatck__item' onClick={onProfileIconClick} button>
        <ListItemIcon>
          <Profile />
        </ListItemIcon>
        {/* <ListItemText>{isAuthenticated ? 'Профиль' : 'Войти'} </ListItemText> */}
      </ListItem>
      <Stack direction="row" justifyContent="center">
        <Link href="/">
          <LogoLink>
            <Image layout="fixed" src={LogoImage} alt="logo" />
          </LogoLink>
        </Link>
      </Stack>
      <Stack direction='row' gap='20px' pr={'10px'} alignItems='center'>
        <Link href={Paths.LIKES}>
          <Badge
            sx={likeBadge}
            color="secondary"
            overlap="circular"
            badgeContent={likedProductsCount}
            // @ts-expect-error
            invisible={likedProductsCount && likedProductsCount < 1}
            max={99}
          >
            <Heart />
          </Badge>

          {/* <ListItemText>Избранное</ListItemText> */}
        </Link>
        <Link href={Paths.CART}>

          <Badge
            sx={countBadge}
            color="secondary"
            overlap="circular"
            badgeContent={productsCount}
            // @ts-expect-error
            invisible={productsCount && productsCount < 1}
            max={99}
          >
            <Cart />
          </Badge>

          {/* <ListItemText>Корзина</ListItemText> */}

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
