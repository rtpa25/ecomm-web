/** @format */

import { useState } from 'react';
import styled from 'styled-components';
import {
  Footer,
  NavBar,
  NewsLetter,
  Products,
  AnnouncementBanner,
} from '../components/Zexporter';

const FilterContainer = styled.div`
  @media only screen and (max-width: 520px) {
    display: flex;
    flex-direction: column;
  }
`;
const Filter = styled.div`
  margin: 1.75rem;
  @media only screen and (max-width: 925px) {
    display: flex;
    flex-direction: column;
  }
`;

const FilterText = styled.span`
  font-size: 1.875rem;
  font-weight: 300;
  margin-right: 1.25rem;
  @media only screen and (max-width: 520px) {
    font-size: 1.5rem;
  }
`;

const Select = styled.select`
  padding: 0.625rem;
  margin: 1.25rem;
`;
const Option = styled.option``;

const Tiltle = styled.h1`
  @media only screen and (max-width: 520px) {
    font-size: 2rem;
  }
`;

const ProductList = () => {
  const [filters, setFilter] = useState({});
  const [sort, setSort] = useState('newest');

  const handleFilters = (
    e: React.ChangeEvent<HTMLSelectElement> | undefined
  ) => {
    const value = e?.target.value;
    setFilter((prevState) => {
      return { [e!.target.name]: value, ...prevState };
    });
  };

  return (
    <div>
      <NavBar />
      <AnnouncementBanner />
      <Tiltle className='text-5xl font-semibold m-7'>{''}</Tiltle>
      <FilterContainer className='flex justify-between'>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name='catagories' onChange={handleFilters}>
            <Option disabled>Catagories</Option>
            <Option>retro</Option>
            <Option>modern</Option>
            <Option>minimalist</Option>
            <Option>dapper</Option>
            <Option>funk</Option>
          </Select>
          <Select name='size' onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>s</Option>
            <Option>m</Option>
            <Option>l</Option>
            <Option>xl</Option>
            <Option>xxl</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select
            defaultValue={'Newest'}
            onChange={(e) => setSort(e.target.value)}>
            <Option>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products filters={filters} sort={sort} />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default ProductList;
