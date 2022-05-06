import { FC } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { LazyImage } from 'components/image';
import colors from 'config/theme';
import Arrow from 'components/icons/arrow';
import { Skeleton, useMediaQuery } from '@mui/material';
import { useBannersQuery } from 'graphql/generated.graphql';


const Card = styled.div<{ height?: number; fullBorderRadius?: boolean }>`
  max-width: 100%;
  
  overflow: hidden;
  max-height: 310px;
  .slick-list {
    max-height: 310px;
    .slick-track {
      
      .slick-slide {
        div {

          height: 100%;
           div {
            img {
              object-fit: cover;
              width: 100%;
              height: 100%;
            }
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

const ImageCarousel: FC<{
  height?: number;
  fullBorderRadius?: boolean;
  images?: string[];
  initialSlide?: number;
  onSlide?: (currenSlide: number) => void;
}> = ({ height, fullBorderRadius, initialSlide, onSlide }) => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { data } = useBannersQuery({
    variables: {
      filter: {
        type: "CAROUSEL",
        viewType: isMobile ? "MOBILE" : "WEB"
      },
      first: 10
    }
  })
  const products = data?.banners?.edges.map((el) => el.node);

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
        // adaptiveHeight={true}
        lazyLoad="progressive"
        afterChange={(currenSlide) => onSlide && onSlide(currenSlide)}
      >
        {products?.map((item) => (
          <div key={item.id}>
            {item.backgroundImage ?
              <LazyImage
                src={item.backgroundImage?.url}
                alt={item.backgroundImage?.alt ? item.backgroundImage?.alt : 'products'}
              />
              :
              <Skeleton variant="rectangular" width='100%' height='100%' />
            }
          </div>
        ))}
      </Slider>
    </Card>
  );
};

export default ImageCarousel;
