import styled from 'styled-components';
import { Button } from 'components/button';

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
export const CatologButton = styled(Button)`
  animation-name: butonOpacity;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  transition: all 0.3s ease-in-out;
  height: 50px;
  max-width: 178px;
  border: 1px solid #FEEE00;

  @keyframes butonOpacity {
    0%{
      background-color: #FEEE00;
    }
    50%{
      background-color: #feed004e;
    }
    100%{
      background-color: #FEEE00;
    }
  }
  &:hover{
    animation: none;
  }
`