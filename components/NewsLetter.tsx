/** @format */

import { Send } from '@material-ui/icons';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  text-align: center;
`;
const Input = styled.input`
  flex: 8;
  padding: 1rem;
  &:focus {
    outline: none !important;
    border: 1px solid teal;
  }
`;
const Button = styled.button`
  flex: 1;
  background-color: teal;
  color: white;
  transition: all 0.3s ease;
  &:hover {
    background-color: black;
    color: teal;
  }
`;

const Form = styled.div`
  @media only screen and (max-width: 620px) {
    width: 75%;
  }
  @media only screen and (max-width: 420px) {
    width: 85%;
  }
`;

const Title = styled.h1`
  @media only screen and (max-width: 420px) {
    font-size: 3rem;
  }
`;

const Info = styled.div`
  @media only screen and (max-width: 420px) {
    font-size: 1rem;
  }
`;

const Newsletter = () => {
  const [formInput, setFormInput] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const formSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormInput('');
  };
  return (
    <Container className='flex flex-col items-center justify-center'>
      <Title className='mb-10 font-semibold text-7xl'>Newsletter</Title>
      <Info className='mb-10 text-xl font-light'>
        Get timely updates from your favorite products.
      </Info>
      <Form className='flex items-center justify-between w-5/12 h-12 bg-white border border-gray-100 border-solid'>
        <Input
          placeholder='Your email'
          className='h-12'
          value={formInput}
          onChange={(e) => {
            setFormInput(e.target.value);
          }}
        />
        <Button className='h-12' onClick={formSubmitHandler}>
          <Send />
        </Button>
      </Form>
      {isSubmitted && <p className='text-green-700'>Thanks for sharing</p>}
    </Container>
  );
};

export default Newsletter;
