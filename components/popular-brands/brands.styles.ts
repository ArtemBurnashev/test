import colors from 'config/theme';
import styled from 'styled-components';

export const BrandWrapper = styled.div`
  background-color: ${colors.grey.brand};
  display: flex;
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  min-height: 80px;
  min-width: 162px;
  &:not(:last-of-type) {
      margin-right: 1rem
  }
  img{
    object-fit: contain;
    min-width: 100%;
    min-height: auto;
  }
`;
