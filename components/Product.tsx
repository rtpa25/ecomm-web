/** @format */

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const Info = styled.div`
  opacity: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
`;
const Container = styled.div`
  flex: 1;
  min-width: 17rem;
  padding: 1rem;
  cursor: pointer;
  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  border-radius: 50%;
`;

interface ProductProps {
  img: string;
  id: string;
}
const Product: React.FC<ProductProps> = ({ img, id }) => {
  return (
    <Container className='m-1.5 h-80 flex items-center justify-center bg-blue-50 relative'>
      <Circle className='absolute bg-white h-60 w-60' />
      <Image src={img} alt={id} className='z-10' layout='fill' />
      <Link href={`/products`} passHref>
        <Info className='absolute z-20 flex items-center justify-center w-full h-full'></Info>
      </Link>
    </Container>
  );
};

export default Product;
