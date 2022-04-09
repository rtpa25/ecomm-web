/** @format */

import {
  NavBar,
  NewsLetter,
  AnnouncementBanner,
  Footer,
} from '../../components/Zexporter';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProductResType } from '../../types/products';
import styled from 'styled-components';
import { Remove, Add } from '@material-ui/icons';
import axiosInstance from '../../utils';
import { doesSessionExist } from 'supertokens-auth-react/recipe/session';
import { useAppDispatch } from '../../hooks';
import { pushOrder, setOrders } from '../../store/slices/orderSlice';

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
  const { id } = router.query;
  const [productData, setProductData] = useState<getProductResType>();
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      if (id != undefined || null) {
        const res = await axiosInstance.get('/getProduct', {
          params: {
            id: id,
          },
        });
        setProductData(res.data);
      }
      setIsLoading(false);
    };
    fetchProductData();
  }, [id]);

  const createOrderHandler = async () => {
    const sess = await doesSessionExist();
    if (sess) {
      const res = await axiosInstance.post('/createOrder', {
        quantity: count,
        address:
          'not relevant yet can be accessed from the user with the help of a serparete page',
        prodcut_id: parseInt(id as string),
        selected_size: size,
      });
      dispatch(pushOrder({ order: res.data }));
    } else {
      router.push('/auth');
    }
  };

  const Loader = (
    <div className='flex justify-center items-center'>
      <div
        className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'
        role='status'>
        <span className='visually-hidden'></span>
      </div>
    </div>
  );

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
            <FilterSize>
              {productData?.available_sizes.map((s: string) => (
                <FilterSizeOption key={s} onClick={() => setSize(s)}>
                  {s}
                </FilterSizeOption>
              ))}
            </FilterSize>
          </Filter>
        </FilterContainer>
        <AddContainer className='flex items-center justify-between w-6/12'>
          <AmountContainer className='flex items-center text-semibold'>
            <div
              onClick={() => {
                setCount((prevState) => {
                  return prevState - 1;
                });
              }}>
              <Remove />
            </div>
            <Amount className='flex items-center justify-center mx-2 my-0 border border-green-600 border-solid rounded-lg w-7 h-7'>
              {count}
            </Amount>
            <div>
              <Add
                onClick={() => {
                  setCount((prevState) => {
                    return prevState + 1;
                  });
                }}
              />
            </div>
          </AmountContainer>
          <Button
            className='p-3.5 border border-green-600 border-solid font-medium'
            onClick={createOrderHandler}>
            ADD TO CART
          </Button>
        </AddContainer>
      </InfoContainer>
    </Wrapper>
  );

  return (
    <>
      <NavBar />
      <AnnouncementBanner />
      {isLoading ? Loader : RealPage}
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Product;
