/** @format */

import styled from 'styled-components';

interface Props {
  id: number;
  img: string;
  title: string;
  description: string;
  bg: string;
}

const Button = styled.button`
  transition: all 0.3s ease;
  &:hover {
    background-color: #000;
    color: #00d8d8;
  }
  @media only screen and (max-width: 420px) {
    font-size: 1rem;
  }
`;

const ImageContainer = styled.div`
  @media only screen and (max-width: 890px) {
    display: none;
  }
`;

const Title = styled.h1`
  @media only screen and (max-width: 620px) {
    font-size: 4rem;
  }
  @media only screen and (max-width: 420px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  @media only screen and (max-width: 420px) {
    font-size: 1rem;
  }
`;

const SliderElement: React.FC<Props> = ({ img, title, description, bg }) => {
  return (
    <div
      className='flex items-center w-screen h-screen justify-evenly'
      style={{ backgroundColor: bg }}>
      <ImageContainer className='flex-1 h-full'>
        <img
          src={img}
          alt='SUMMER SALE'
          className='object-cover w-full h-screen'
        />
      </ImageContainer>
      <div className='flex-1 p-16'>
        <Title className='font-semibold text-8xl'>{title}</Title>
        <Desc className='mx-0 my-16 text-xl font-normal tracking-widest'>
          {description}
        </Desc>
        <Button className='p-3.5 text-xl font-normal border border-solid border-black'>
          SHOP NOW
        </Button>
      </div>
    </div>
  );
};

export default SliderElement;
