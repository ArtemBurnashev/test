import { Typography } from '@mui/material';
import colors from 'config/theme';
import Link from 'next/link';
import styled from 'styled-components';

export const FooterTopWrapper = styled.div`
  width: 100%;
  background-color: ${colors.grey.light};
  padding: 40px 0;
`;

export const FooterBottomWrapper = styled.div`
  width: 100%;
  background-color: ${colors.grey.lighter};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
`;

export const Logo = styled.div`
  max-width: 3.125rem;
  max-height: 63px;
  width: 100%;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  span{
    max-width: 63px;
    max-height: 63px;
  }
`;

export const SocialMediaIcon = styled.div`
  width: 32px;
  height: 32px;
`;

export const FooterLink = styled(Typography)`
  font-size: 14px;
  color: ${colors.black};
`;

export const CartWrapper = styled.div`
  max-width: 40px;
  height: 23px;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
