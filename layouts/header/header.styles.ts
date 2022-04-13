import styled from 'styled-components';

export const Logo = styled.div`
  max-width: 192px;
  max-height: 88px;
  cursor: pointer;
  display: flex;
  margin-right: 32px;
  span{
    max-width: 200px;
    max-height: 50px;
  }
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  @media (max-width:757px) {
    margin-right: 4px;
    max-width: 143px;
    span{
      max-width: 144px;
      max-height: 41px;
    }
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }
  @media (max-width:577px){
    display: none;
  }
`;
