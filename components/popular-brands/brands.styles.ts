import colors from 'config/theme';
import styled from 'styled-components';

export const BrandWrapper = styled.div`
  padding: 18px;
  background-color: ${colors.grey.brand};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  min-height: 3rem;
  min-width: 6rem;
  &:not(:last-of-type) {
      margin-right: 1rem
  }
`;
