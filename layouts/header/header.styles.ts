import styled from 'styled-components';

export const Logo = styled.div`
  max-width: 139px;
  max-height: 88px;
  cursor: pointer;
  span{
    max-width: 200px;
    max-height: 50px;
  }
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  @media (max-width:577px){
    display: none;
  }
`;
