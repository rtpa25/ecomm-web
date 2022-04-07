/** @format */
import styled from 'styled-components';
import Product from './Product';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-template-rows: repeat(auto-fit, 1fr);
`;

interface ProductsProps {
  category: string;
  filters: Object;
  sort: string;
}

const Products: React.FC<ProductsProps> = ({ category, filters, sort }) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get('http://localhost:8080/listProducts', {
        params: {
          limit: 1,
          offset: 0,
        },
      });
      setData(res.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    //TODO: DEBUG!!!
    if (sort === 'newest') {
      setData((prevState: any) =>
        [...prevState].sort((a: any, b: any) => a.createdAt - b.createdAt)
      );
    } else if (sort === 'asc') {
      setData((prevState: any) =>
        [...prevState].sort((a: any, b: any) => b.price - a.price)
      );
    } else {
      setData((prevState: any) =>
        [...prevState].sort((a: any, b: any) => a.price - b.price)
      );
    }
  }, [sort]);

  return (
    <Container className=' p-7'>
      {isLoading ? (
        <div className='flex justify-center items-center'>
          <div
            className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'
            role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        data?.result?.map((product: any) => {
          console.log(product);
          return (
            <Product
              img={product.product.image_url}
              id={product.product.id}
              key={product.product.id}
            />
          );
        })
      )}
    </Container>
  );
};

export default Products;
