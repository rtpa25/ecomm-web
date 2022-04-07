/** @format */

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const Info = styled.div`
  top: 0;
  left: 0;
  text-align: center;
`;

const Container = styled.div`
  height: 70vh;
`;

const Button = styled.button`
  background-color: #fff;
  color: #000;
  transition: all 0.3s ease;
  &:hover {
    background-color: #000;
    color: #00d8d8;
  }
  @media only screen and (max-width: 890px) {
    font-size: 1.5rem;
    background-color: #000;
    color: #00d8d8;
  }
  @media only screen and (max-width: 692px) {
    font-size: 1.2rem;
    margin-bottom: 5rem;
  }
  @media only screen and (max-width: 420px) {
    font-size: 1rem;
  }
`;

const Title = styled.h1`
  @media only screen and (max-width: 890px) {
    font-size: 4rem;
    margin-bottom: 5rem;
  }
  @media only screen and (max-width: 692px) {
    font-size: 3rem;
    margin-bottom: 5rem;
  }
  @media only screen and (max-width: 420px) {
    font-size: 2rem;
  }
`;

interface CategoryItemProps {
  id: number;
  img: string;
  title: string;
  category: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  img,
  title,
  category,
}) => {
  return (
    <Container className='relative flex-1'>
      <Image src={img} alt='' className='object-cover' layout='fill' />
      <Info className='absolute flex flex-col items-center justify-center w-full h-full'>
        <Title className='mb-5 text-4xl font-semibold text-white'>
          {title}
        </Title>
        <Link href={'/products'} passHref>
          <Button className='p-3 cursor-pointer'>SHOP NOW</Button>
        </Link>
      </Info>
    </Container>
  );
};

export default CategoryItem;
