/** @format */

import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  @media only screen and (max-width: 450px) {
    display: none;
  }
`;

const AnnouncementBanner: FC = () => {
  return (
    <Container className='h-11 bg-teal-600 text-white text-lg font-normal flex justify-center items-center tracking-wider'>
      Super Deal! Free Shipping on Order Over $50
    </Container>
  );
};

export default AnnouncementBanner;
