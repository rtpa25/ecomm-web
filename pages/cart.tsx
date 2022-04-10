/** @format */

import { NextPage } from 'next';
import { Add, Remove, Delete } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  AnnouncementBanner,
  NavBar,
  NewsLetter,
  Footer,
} from '../components/Zexporter';
import { useAppDispatch, useAppSelector } from '../hooks/index';
import Link from 'next/link';
import axiosInstance from '../utils';
import { delteOrder, updateOrder } from '../store/slices/orderSlice';
import order from '../types/orders';
import StripeCheckout from 'react-stripe-checkout';

interface TopButtonProps {
  bod: 'outlined' | 'filled';
}

const TopButton = styled.button<TopButtonProps>`
  padding: 0.625rem;
  font-weight: 600;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${(props) =>
      props.bod === 'outlined' ? 'black' : 'white'};
    border: ${(props) =>
      props.bod === 'filled' ? '1px solid rgba(16, 185, 129, 1)' : 'none'};
    color: ${(props) =>
      props.bod === 'filled' ? 'black' : 'rgba(16, 185, 129, 1)'};
  }
  @media only screen and (max-width: 500px) {
    margin: 1rem 0;
    width: 70%;
  }
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 685px) {
    flex-direction: column;
  }
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 15rem;
`;

const Details = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  @media only screen and (max-width: 685px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductAmount = styled.div`
  font-size: 1.5rem;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 200;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 0.625rem;
  padding: 1.25rem;
  height: 50vh;
`;

const SummaryItem = styled.div`
  margin: 1.875rem 0;
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  @media only screen and (max-width: 925px) {
    flex-direction: column;
  }
`;

const QuantityButtonInc = styled(Add)`
  cursor: pointer;
  background-color: green;
  border-radius: 50%;
  color: white;
`;
const QuantityButtonDec = styled(Remove)`
  cursor: pointer;
  background-color: red;
  border-radius: 50%;
  color: white;
`;

const TopButtons = styled.div`
  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const Cart: NextPage = () => {
  const orders = useAppSelector((state) => state.orders.res);
  const dispatch = useAppDispatch();
  let total = 0;
  for (let i = 0; i < orders.length; i++) {
    const { price, quantity } = orders[i];
    total += parseInt(price) * quantity;
  }

  const updateCartHandler = async (
    id: number,
    product_id: number,
    quantity: number,
    type: 'inc' | 'dec'
  ) => {
    const updatedOrder = orders.find((o) => {
      return o.id === id;
    });

    try {
      //optimistic update of order quantity before the network req is successfull
      dispatch(
        updateOrder({
          id: id,
          updatedQuantity:
            type === 'inc'
              ? updatedOrder!.quantity + 1
              : updatedOrder!.quantity - 1,
        })
      );
      const res = await axiosInstance.patch('/updateOrder', {
        id: id,
        quantity: type === 'inc' ? quantity + 1 : quantity - 1,
        address:
          'this field is not relevant yet I can add an additional set of dropdowns or pages for user to select address if it is a real store',
        prodcut_id: product_id,
        selected_size: 'm',
      });
    } catch (error) {
      //rollback the optimistic update if some unexpected error occurs
      console.log(error);
      dispatch(
        updateOrder({
          id: id,
          updatedQuantity:
            type === 'inc' ? updatedOrder!.quantity : updatedOrder!.quantity,
        })
      );
    }
  };

  const [stripeToken, setStripeToken] = useState(null);
  const KEY =
    'pk_test_51Jy8ycSFA8z2kwZwnxQXmFjttu133U1uIjZ5gAXbIKvbvuRBoYShBfdH5aSEDtMdHv0zhLF7gvytN4UHiTFh5hCt00bRFTYcf7';
  const onToken = (token: any) => {
    setStripeToken(token);
  };

  const paymentHandler = async () => {
    try {
      let res = await axiosInstance.post(`/captureStripePayment`, {
        amount: total * 100,
      });
      console.log(res);

      stripeToken && total >= 10;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProductHandler = async (orderId: number) => {
    try {
      dispatch(delteOrder({ orderId: orderId }));
      await axiosInstance.delete('/deleteOrder', {
        params: {
          order_id: orderId,
        },
      });
    } catch (error) {
      console.log(error);
      window.location.reload(); //refresh if the network request is unsuccessfull
    }
  };

  return (
    <div className=''>
      <NavBar />
      <AnnouncementBanner />
      <div className='p-5 text-gray-700'>
        <h1 className='text-4xl font-light text-center'>YOUR BAG</h1>
        <TopButtons className='flex items-center justify-between p-5'>
          <Link href={'/products'} passHref>
            <TopButton
              bod='outlined'
              className='border border-green-500 border-solid '>
              CONTINUE SHOPPING
            </TopButton>
          </Link>
          <StripeCheckout
            name='NYKA'
            image='https://cdn.gadgets360.com/kostprice/assets/store/1493096224_nykaa.png'
            billingAddress
            shippingAddress
            description={`Your total is $${total}`}
            amount={total * 100}
            token={onToken}
            stripeKey={KEY as string}>
            <TopButton
              bod='filled'
              className='text-green-500 bg-black '
              onClick={paymentHandler}>
              CHECKOUT NOW
            </TopButton>
          </StripeCheckout>
        </TopButtons>

        <Wrapper className='flex justify-between'>
          <Info className=''>
            {orders.map((order) => {
              return (
                <Product key={order.id_2}>
                  <ProductDetail>
                    <Image src={order.image_url} alt={order.name} />
                    <Details>
                      <span>
                        <b>Product:</b> {order.name}
                      </span>
                      <span>
                        <b>Size:</b> {order.selected_size}
                      </span>
                      <span>
                        <b>OrderId:</b> {order.id}
                      </span>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <div>
                      <ProductAmountContainer>
                        <QuantityButtonInc
                          onClick={() =>
                            updateCartHandler(
                              order.id,
                              order.product_id,
                              order.quantity,
                              'inc'
                            )
                          }
                        />
                        <ProductAmount>{order.quantity}</ProductAmount>
                        <QuantityButtonDec
                          onClick={() =>
                            updateCartHandler(
                              order.id,
                              order.product_id,
                              order.quantity,
                              'dec'
                            )
                          }
                        />
                      </ProductAmountContainer>
                      <ProductPrice>
                        {' '}
                        $ {parseInt(order.price) * order.quantity}
                      </ProductPrice>
                    </div>
                    <div
                      className='cursor-pointer'
                      onClick={() => {
                        deleteProductHandler(order.id);
                      }}>
                      <Delete color='secondary' />
                    </div>
                  </PriceDetail>
                </Product>
              );
            })}
            <hr />
          </Info>
          <Summary className=''>
            <h1 className='text-4xl font-extralight'>ORDER SUMMARY</h1>
            <SummaryItem>
              <span>Subtotal</span>
              <span>$ {total}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Estimated Shipping</span>
              <span>$ 5.90</span>
            </SummaryItem>
            <SummaryItem>
              <span>Shipping Discount</span>
              <span>$ -5.90</span>
            </SummaryItem>
            <SummaryItem className='text-xl font-semibold'>
              <span>Total</span>
              <span>$ {total}</span>
            </SummaryItem>
            <StripeCheckout
              name='NYKA'
              image='https://cdn.gadgets360.com/kostprice/assets/store/1493096224_nykaa.png'
              billingAddress
              shippingAddress
              description={`Your total is $${total}`}
              amount={total * 100}
              token={onToken}
              stripeKey={KEY as string}>
              <TopButton
                bod='filled'
                className='text-green-500 bg-black '
                onClick={paymentHandler}>
                CHECKOUT NOW
              </TopButton>
            </StripeCheckout>
          </Summary>
        </Wrapper>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Cart;
