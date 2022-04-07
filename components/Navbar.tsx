/** @format */

import styled from 'styled-components';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { doesSessionExist } from 'supertokens-auth-react/recipe/session';
import Badge from '@material-ui/core/Badge';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { signOut } from 'supertokens-auth-react/recipe/emailpassword';

const Container = styled.div`
  @media only screen and (max-width: 890px) {
    height: 4rem;
  }
`;

const Right = styled.div`
  @media only screen and (max-width: 890px) {
    justify-content: flex-start;
  }
  @media only screen and (max-width: 420px) {
    font-size: 1rem;
  }
`;

const Heading = styled.h1`
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: teal;
  }
  @media only screen and (max-width: 420px) {
    font-size: 1.5rem;
  }
`;

const Navbar: FC = () => {
  const [session, setSession] = useState<boolean | undefined>(undefined);
  const signoutHandler = async () => {
    await signOut();
    window.location.href = '/';
  };

  useEffect(() => {
    const fetchSession = async () => {
      const val = await doesSessionExist();
      setSession(val);
    };
    fetchSession();
  }, []);

  return (
    <Container className='h-24'>
      <div className='flex justify-between px-4 py-4'>
        <div className='text-center'>
          <Heading className='text-4xl font-semibold'>NYKA.</Heading>
        </div>
        <Right className='flex items-center justify-end '>
          {session == false ? (
            <>
              <Link href={'/auth'} passHref>
                <div className='text-lg cursor-pointer ml-10 font-light'>
                  REGISTER
                </div>
              </Link>
              <Link href={'/auth'} passHref>
                <div className='text-lg cursor-pointer ml-10 font-light'>
                  SIGN-IN
                </div>
              </Link>
            </>
          ) : (
            <>
              <div className='text-lg cursor-pointer ml-10 font-light'>
                <a onClick={signoutHandler}>SIGN-OUT</a>
              </div>
              <Link href={'/cart'} passHref>
                <div className='text-lg cursor-pointer ml-10 font-light'>
                  <Badge badgeContent={3} color='primary'>
                    <ShoppingCartOutlined />
                  </Badge>
                </div>
              </Link>
            </>
          )}
        </Right>
      </div>
    </Container>
  );
};

export default Navbar;
