/** @format */

import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import styled from 'styled-components';
import SliderElement from './SliderElement';
import { useState } from 'react';
import { sliderItems } from '../data';

interface ArrowProps {
  direction: 'left' | 'right';
}

const Arrow = styled.div<ArrowProps>`
  left: ${(props) => props.direction === 'left' && '10px'};
  right: ${(props) => props.direction === 'right' && '10px'};
  z-index: 2;
  top: 50vh;
  opacity: 0.2;
`;

interface WrapperProps {
  slideIndex: number;
}

const Wrapper = styled.div<WrapperProps>`
  transition: all 1.2s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <div className='relative flex w-full h-screen overflow-hidden'>
      <Arrow
        className='w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center absolute cursor-pointer'
        direction='left'
        onClick={() => handleClick('left')}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper className='flex' slideIndex={slideIndex}>
        {sliderItems.map((item) => {
          return (
            <SliderElement
              id={item.id}
              img={item.img}
              title={item.title}
              description={item.desc}
              bg={item.bg}
              key={item.id}
            />
          );
        })}
      </Wrapper>
      <Arrow
        className='w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center absolute cursor-pointer'
        direction='right'
        onClick={() => handleClick('right')}>
        <ArrowRightOutlined />
      </Arrow>
    </div>
  );
};

export default Slider;
