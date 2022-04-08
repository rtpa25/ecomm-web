/** @format */

import {
  NavBar,
  NewsLetter,
  AnnouncementBanner,
  Footer,
  NoSSR,
} from '../../components/Zexporter';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils';
import { getProductResType } from '../../types/ListAllProductsResTypes';
import styled from 'styled-components';
import { Remove, Add } from '@material-ui/icons';

//TODO: first fetch the relevant data that will be rendered and get logs out of it
//TODO: Update the backend of the specific route so it get's the id from the query
//TODO: Then make the UI
//TODO: Do proper error handling for the enitre frontend that has been made till now
//TODO: shift to the order routes and build all order related routes
//TODO: hook up the frontend with all the newly created routes

const Wrapper = styled.div`
  @media only screen and (max-width: 685px) {
    flex-direction: column;
  }
`;

const ImgContainer = styled.div``;

const Image = styled.img`
  object-fit: cover;
  @media only screen and (max-width: 890px) {
    height: 100%;
  }
`;

const InfoContainer = styled.div`
  @media only screen and (max-width: 685px) {
    padding: 1rem 0;
  }
`;

const Title = styled.h1``;

const Desc = styled.p``;

const Price = styled.span``;

const FilterContainer = styled.div``;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 1.25rem;
  font-weight: 200;
`;

interface FilterColorProps {
  color: string;
}

const FilterColor = styled.div<FilterColorProps>`
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 0.4rem;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 0.625rem;
  padding: 0.4rem;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  @media only screen and (max-width: 1100px) {
    width: 75%;
  }
  @media only screen and (max-width: 685px) {
    width: 100%;
  }
`;

const AmountContainer = styled.div``;

const Amount = styled.span``;

const Button = styled.button`
  transition: all 0.3s ease;
  &:hover {
    background-color: #000;
    color: #00d8d8;
  }
  @media only screen and (max-width: 1100px) {
    font-size: 0.7rem;
  }
`;

const Product: NextPage = () => {
  const router = useRouter();
  const { id } = router.query; //this loads up in the server side and is empty string
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [productData, setProductData] = useState<getProductResType>();

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        const data = await axiosInstance.get('/getProduct', {
          params: {
            id: id,
          },
        });
        setProductData(data?.data);
      } catch (error: any) {
        setError(error);
      }

      setIsLoading(false);
    };
    fetchProductData();
  }, [id]);

  const Loader = (
    <div className='flex justify-center items-center'>
      <div
        className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'
        role='status'>
        <span className='visually-hidden'></span>
      </div>
    </div>
  );

  const ErrorHandler = <div>{error.message}</div>;

  const RealPage = (
    <Wrapper className='flex p-12'>
      <ImgContainer className='flex-1'>
        <Image src={`${productData?.product.image_url}`} alt='product' />
      </ImgContainer>
      <InfoContainer className='flex-1 px-12 py-0'>
        <Title className='text-4xl text-gray-700 font-extralight'>
          {productData?.product.name}
        </Title>
        <Desc className='mx-0 text-gray-700 my-7'>
          {productData?.product.description}
        </Desc>
        <Price className='text-4xl font-thin text-gray-500'>
          $ {productData?.product.price}
        </Price>
        <FilterContainer className='flex justify-between w-6/12 mx-0 my-7'>
          <Filter>
            <FilterTitle>Size</FilterTitle>
            <FilterSize onChange={() => {}}>
              {productData?.available_sizes.map((s: string) => (
                <FilterSizeOption key={s}>{s}</FilterSizeOption>
              ))}
            </FilterSize>
          </Filter>
        </FilterContainer>
        <AddContainer className='flex items-center justify-between w-6/12'>
          <AmountContainer className='flex items-center text-semibold'>
            <Remove onClick={() => {}} />
            <Amount className='flex items-center justify-center mx-2 my-0 border border-green-600 border-solid rounded-lg w-7 h-7'>
              {}
            </Amount>
            <Add onClick={() => {}} />
          </AmountContainer>
          <Button
            className='p-3.5 border border-green-600 border-solid font-medium'
            onClick={() => {}}>
            ADD TO CART
          </Button>
        </AddContainer>
      </InfoContainer>
    </Wrapper>
  );

  return (
    <NoSSR>
      <NavBar />
      <AnnouncementBanner />
      {error ? ErrorHandler : isLoading ? Loader : RealPage}
      <NewsLetter />
      <Footer />
    </NoSSR>
  );
};

export default Product;
