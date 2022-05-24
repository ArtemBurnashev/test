import React, { useRef, useState } from 'react';

interface ZoomProps {
  height: number;
  width: number;
  transitionTime: number;
  img: string;
  zoomScale: number;
}

const Zoom: React.FC<ZoomProps> = ({
  height,
  img,
  transitionTime,
  width,
  zoomScale,
}) => {
  const [state, setState] = useState<{
    zoom: boolean;
    mouseX: number | null;
    mouseY: number | null;
  }>({
    zoom: false,
    mouseX: null,
    mouseY: null,
  });
  const imageRef = useRef<HTMLDivElement>(null);
  const outerDivStyle = {
    height: `${height}px`,
    width: `${width}px`,
    overflow: 'hidden',
  };

  const innerDivStyle = {
    height: `${height}px`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'auto 100%',
    transition: `transform ${transitionTime}s ease-out`,
    backgroundImage: `url('${img}')`,
  };

  const handleMouseOver = () => {
    setState((oldState) => ({ ...oldState, zoom: true }));
  };

  const handleMouseOut = () => {
    setState((oldState) => ({ ...oldState, zoom: false }));
  };

  const handleMouseMovement = (e: React.MouseEvent<HTMLDivElement>) => {
    // @ts-expect-error
    let { left: offsetLeft, top: offsetTop } =
      imageRef.current?.getBoundingClientRect();

    // @ts-expect-error
    let { height, width } = imageRef.current?.style;

    const x = ((e.pageX - offsetLeft) / parseInt(width, 10)) * 100;
    const y = ((e.pageY - offsetTop) / parseInt(height, 10)) * 100;

    setState((oldState) => ({
      ...oldState,
      mouseX: x,
      mouseY: y,
    }));
  };

  const { mouseX, mouseY, zoom } = state;

  const transform = {
    transformOrigin: `${mouseX}% ${mouseY}%`,
  };

  return (
    <div
      style={outerDivStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseMove={handleMouseMovement}
      ref={imageRef}
    >
      <div
        style={{
          ...transform,
          ...innerDivStyle,
          transform: zoom ? `scale(${zoomScale})` : 'scale(1.0)',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default Zoom;
