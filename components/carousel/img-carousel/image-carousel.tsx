import { FC } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import colors from 'config/theme';

 const Card = styled.div`
   .slick-slider {
     height: 435px;
     @media (max-width: 768px) {
       height: 435px;
       height: 358px;
     }
   }
   position: relative;
   img {
     width: 100%;
     height: 100%;
     object-fit: contain;
   }
   .slick-dots {
     bottom: -150px;
     li {
       width: 80px;
       height: 80px;
       border: 3px solid ${colors.grey.lighter};
       border-radius: 8px;
       padding: 5px;
       margin-bottom: 10px;
     }
     @media (max-width: 456px) {
       li {
         width: 52px;
         height: 52px;
       }
     }
     .slick-active {
       border: 3px solid ${colors.primary.default};
     }
   }
   .slick-slide {
     text-align: center;
   }
 `;

const ImageCarousel: FC<{
  images?: string[];
  initialSlide?: number;
  imgs?: {
    url: string;
    alt: string;
  }[] | null | undefined

  onSlide?: (currenSlide: number) => void;
}> = ({ initialSlide, onSlide, children, imgs }) => {


  const settings = {
    infinite: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initialSlide || 0,
    autoplay: false,
    arrows: false,
    adaptiveHeight: true,
    dotsClass: "slick-dots slick-thumb",
    afterChange: (currenSlide: any) => onSlide && onSlide(currenSlide),
    customPaging: function (i: any) {
      
      return (
        <a>
          <img src={imgs ? imgs[i].url : ' '} />
        </a>
      );
    },
  }
 
  
  return (
    <Card>
      <Slider {...settings}>
        {children}
      </Slider>
    </Card>

  );
};

export default ImageCarousel;
