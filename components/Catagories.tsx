/** @format */

import styled from 'styled-components';
import { categories } from '../data';
import CategoryItem from './CategoryItem';

const Container = styled.div`
  @media only screen and (max-width: 890px) {
    flex-direction: column;
  }
`;

const Categories = () => {
  return (
    <Container className='flex justify-between p-7'>
      {categories.map((item) => {
        return (
          <CategoryItem
            img={item.img}
            title={item.title}
            id={item.id}
            category={item.category}
            key={item.id}
          />
        );
      })}
    </Container>
  );
};

export default Categories;
