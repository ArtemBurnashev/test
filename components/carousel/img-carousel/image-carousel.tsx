import { FC } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import colors from 'config/theme';

const Card = styled.div`
  max-width: 100%;
  overflow: hidden;
  .slick-list {
    .slick-track {
      .slick-slide {
        div > div {
          img {
            object-fit: cover;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .slick-slider {
    .slick-dots {
      bottom: 25px;
      li {
        background-color: rgba(255, 255, 255, 0.66);
        border-radius: 50%;
        width: 10px;
        height: 10px;
        button {
          &::before {
            display: none;
          }
        }
        &.slick-active {
          background-color: ${colors.white};
        }
      }
    }
  }
  .slick-prev {
    left: 8px;
    z-index: 10;
  }
  .slick-next {
    right: 8px;
  }
`;

const ImageCarousel: FC<{
  images?: string[];
  initialSlide?: number;
  onSlide?: (currenSlide: number) => void;
}> = ({ initialSlide, onSlide, children }) => {
  return (
    <Card>
      <Slider
        infinite={false}
        slidesToShow={1}
        slidesToScroll={1}
        initialSlide={initialSlide || 0}
        autoplay={false}
        arrows={false}
        afterChange={(currenSlide) => onSlide && onSlide(currenSlide)}
      >
        {children}
      </Slider>
    </Card>
  );
};

export default ImageCarousel;
