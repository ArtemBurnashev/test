import colors from 'config/theme';
import styled from 'styled-components';

export const BrandWrapper = styled.div`
  background-color: ${colors.grey.brand};
  display: flex;
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  
  min-height: 80px;
  min-width: 162px;
 
  img{
    object-fit: contain;
    min-width: 100%;
    min-height: auto;
  }
  @media (max-width:625px){
    min-width: 40%;
    
  }
`;
