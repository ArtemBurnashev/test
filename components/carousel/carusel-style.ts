import styled from "styled-components";


const CategoryCaruselCard = styled.div`
  max-width: 100%;
  overflow: hidden;
  margin: 2rem 0;
  @media (max-width: 768px){
    margin: 1rem 0;
    h6{
      font-size: 14px;
    }
  }
  .slick-track{
    left: 0;
  }
`;




export {CategoryCaruselCard}