/** @format */

import styled from 'styled-components';
import { popularProducts } from '../data';
import DummyProduct from './DummyProduct';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-template-rows: repeat(auto-fit, 1fr);
`;

const DummyProducts = () => {
  return (
    <Container className=' p-7'>
      {popularProducts.map((product) => {
        return (
          <DummyProduct img={product.img} id={product.id} key={product.id} />
        );
      })}
    </Container>
  );
};

export default DummyProducts;
