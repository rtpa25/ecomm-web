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
import { getProductResType } from '../../types/ListAllProductsResTypes';
import styled from 'styled-components';
import { Remove, Add } from '@material-ui/icons';
import { useAppSelector } from '../../hooks';

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
  const [productData, setProductData] = useState<getProductResType>();
  const productsData = useAppSelector((state) => state.product);

  useEffect(() => {
    for (let i = 0; i < productsData.result.length; i++) {
      if (productsData.result[i].product.id == id) {
        setProductData(productsData.result[i]);
      }
    }
  }, [id, productsData.result]);

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
      {RealPage}
      <NewsLetter />
      <Footer />
    </NoSSR>
  );
};

export default Product;
