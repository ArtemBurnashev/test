import { IconButton } from '@mui/material';
import colors from 'config/theme';
import styled, { css } from 'styled-components';

const imageCss = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CategoryCardWrapper = styled.div`
  background-color: ${colors.grey.light};
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 14px 16px;
  max-width: 241px;
  gap: 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
`;

export const CategoryCardImageWrapper = styled.div`
  width: 96px;
  height: 96px;
  img {
    ${imageCss}
  }
`;

export const ProductCardWrapper = styled.div`
  width: 214px;
  position: relative;
  padding: 4px;
  max-height: 323px;
  height: 100%;
  cursor: pointer;
`;

export const ProductCardLabel = styled.div<{ isNew: boolean }>`
  position: absolute;
  top: 6px;
  left: 6px;
  padding: 6px;
  background-color: ${({ isNew }) =>
    isNew ? colors.green.default : colors.red.default};
  z-index: 2;
`;

export const ProductHeartWrapper = styled.button<{ isSaved: boolean }>`
  position: absolute;
  top: 12px;
  width: 32px;
  height: 32px;
  right: 18px;
  display: flex;
  place-items: center;
  background-color: ${({ isSaved }) =>
    isSaved ? colors.red.default : colors.white};
  color: ${({ isSaved }) => (isSaved ? colors.white : colors.grey.default)};
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
`;

export const ProductCardImageWrapper = styled.div`
  width: 100%;
  max-height: 235px;
  height: 165px;
  img {
    ${imageCss}
  }
`;

export const HorizontalCardWrapper = styled.div`
  padding: 8px 4px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  max-height: 157px;
`;

export const HorizontalCardImageWrapper = styled.div`
  width: 140px;
  height: 140px;
  img {
    ${imageCss}
  }
`;
