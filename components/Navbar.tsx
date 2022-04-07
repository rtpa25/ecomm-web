/** @format */

import styled from 'styled-components';
import { FC } from 'react';
import Link from 'next/link';

const Container = styled.div`
  @media only screen and (max-width: 890px) {
    height: 4rem;
  }
`;

const Right = styled.div`
  @media only screen and (max-width: 890px) {
    justify-content: flex-start;
  }
  @media only screen and (max-width: 420px) {
    font-size: 1rem;
  }
`;

const Heading = styled.h1`
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: teal;
  }
  @media only screen and (max-width: 420px) {
    font-size: 1.5rem;
  }
`;

const Navbar: FC = () => {
  return (
    <Container className='h-24'>
      <div className='flex justify-between px-4 py-4'>
        <div className='text-center'>
          <Heading className='text-4xl font-semibold'>NYKA.</Heading>
        </div>
        <Right className='flex items-center justify-end '>
          <Link href={'/auth'} passHref>
            <div className='text-lg cursor-pointer ml-10 font-light'>
              REGISTER
            </div>
          </Link>
          <div className='text-lg cursor-pointer ml-10 font-light'>SIGNIN</div>
        </Right>
      </div>
    </Container>
  );
};

export default Navbar;
