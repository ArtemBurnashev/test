import { FC } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { LazyImage } from 'components/image';
import colors from 'config/theme';
import Arrow from 'components/icons/arrow';

const Card = styled.div<{ height?: number; fullBorderRadius?: boolean }>`
  max-width: 100%;
  height: 301px;
  overflow: hidden;
  .slick-list {
    height: ${({ height }) => (height ? `${height}px` : '100%')};
    .slick-track {
      .slick-slide {
        div > div {
          height: ${({ height }) => (height ? `${height}px` : '100%')};
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

const NextArrow = styled(Arrow)`
  transform: rotate(180deg) translate(0, 50%);
`;

const Image = styled(LazyImage)<{ height?: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const images = [
  "https://picsum.photos/id/200/700",
  "https://picsum.photos/id/209/700",
  "https://picsum.photos/id/234/700",
  "https://picsum.photos/id/210/700",
];

const ImageCarousel: FC<{
  height?: number;
  fullBorderRadius?: boolean;
  images?: string[];
  initialSlide?: number;
  onSlide?: (currenSlide: number) => void;
}> = ({ height, fullBorderRadius, initialSlide, onSlide }) => {
  return (
    <Card height={height}>
      <Slider
        infinite
        dots={false}
        slidesToShow={1}
        slidesToScroll={1}
        initialSlide={initialSlide || 0}
        autoplay
        autoplaySpeed={4000}
        prevArrow={<Arrow />}
        nextArrow={<NextArrow />}
        lazyLoad="progressive"
        afterChange={(currenSlide) => onSlide && onSlide(currenSlide)}
      >
        {images?.map((item) => (
          <div key={item}>
            <Image src={item} alt="slide" />
          </div>
        ))}
      </Slider>
    </Card>
  );
};

export default ImageCarousel;
