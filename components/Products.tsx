/** @format */
import styled from 'styled-components';
import Product from './Product';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import ListAllProductsResType, {
  getProductResType,
  product,
} from '../types/ListAllProductsResTypes';
import { axiosInstance } from '../utils';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-template-rows: repeat(auto-fit, 1fr);
`;

interface ProductsProps {
  filters: Object;
  sort: string;
}

const Products: React.FC<ProductsProps> = ({ filters, sort }) => {
  const [data, setData] = useState<ListAllProductsResType>();
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axiosInstance.get('/listProducts', {
        params: {
          limit: 8,
          offset: offset,
          filters: filters,
          sort: sort,
        },
      });
      setData(res.data);
      setIsLoading(false);
    };
    fetchData();
  }, [filters, offset, sort]);

  const paginationHandler = () => {
    //increase offset by a count of 8
    setOffset((prevState) => {
      return prevState + 8;
    });
  };

  return (
    <>
      <Container className=' p-7'>
        {isLoading ? (
          <div className='flex justify-center items-center'>
            <div
              className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'
              role='status'>
              <span className='visually-hidden'></span>
            </div>
          </div>
        ) : (
          data?.result?.map((res: getProductResType) => {
            return (
              <Product
                img={res.product.image_url}
                id={res.product.id}
                key={res.product.id}
              />
            );
          })
        )}
      </Container>
      <div className='flex justify-center items-center m-10'>
        <button
          className='w-3/12 text-center bg-black text-teal-500 p-4'
          onClick={paginationHandler}>
          Load More
        </button>
        <button
          className='w-3/12 text-center bg-gray-100 text-black p-4'
          onClick={() => {
            setOffset(0);
          }}>
          Go back to first page
        </button>
      </div>
    </>
  );
};

export default Products;
