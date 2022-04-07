/** @format */

import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from '@material-ui/icons';
import Image from 'next/image';
import styled from 'styled-components';

interface SocialIconProps {
  color: string;
}

const SocialIcon = styled.div<SocialIconProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
    box-shadow: rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.8rem;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: teal;
    transform: scaleY(1.1);
    box-shadow: rgba(0, 0, 0, 0.2);
  }
`;

const ContactItem = styled.div`
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: teal;
    transform: scaleY(1.1);
    box-shadow: rgba(0, 0, 0, 0.2);
  }
`;

const Center = styled.div`
  @media only screen and (max-width: 890px) {
    display: none;
  }
`;

const Contact = styled.div`
  @media only screen and (max-width: 500px) {
    display: none;
  }
`;

const Footer = () => {
  return (
    <div className='flex'>
      <div className='flex flex-col flex-1 p-7'>
        <h1 className='text-4xl font-semibold'>NYKA.</h1>
        <p className='my-7 '>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </p>
        <div className='flex '>
          <SocialIcon color='3B5999'>
            <Facebook />
          </SocialIcon>
          <SocialIcon color='E4405F'>
            <Instagram />
          </SocialIcon>
          <SocialIcon color='55ACEE'>
            <Twitter />
          </SocialIcon>
          <SocialIcon color='E60023'>
            <Pinterest />
          </SocialIcon>
        </div>
      </div>
      <Center className=' p-7'>
        <Title>Useful Links</Title>
        <ul className='flex flex-wrap p-0 m-0'>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Jackets</ListItem>
          <ListItem>Shirts</ListItem>
          <ListItem>loungewear</ListItem>
          <ListItem>Account Details</ListItem>
          <ListItem>
            <a
              target='_blank'
              href='https://portfolio-1-admin-dashboard.vercel.app'
              rel='noreferrer'>
              Admin-Panel
            </a>
          </ListItem>
          <ListItem>Terms</ListItem>
        </ul>
      </Center>
      <Contact className=' p-7'>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: '10px' }} /> Unit-8 Bhubaneshwar, Odisha,
          India
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: '10px' }} /> +91-9861736576
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: '10px' }} /> pandaronit25@gmail.com
        </ContactItem>
        <Image
          src='https://i.ibb.co/Qfvn4z6/payment.png'
          alt='payment methods'
          width={'250'}
          height={'30'}
        />
      </Contact>
    </div>
  );
};

export default Footer;
