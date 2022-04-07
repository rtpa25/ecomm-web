/** @format */

import type { NextPage } from 'next';
import {
  AnnouncementBanner,
  NavBar,
  Slider,
  Catagories,
  DummyProducts,
  NewsLetter,
  Footer,
} from '../components/Zexporter';

const Home: NextPage = () => {
  return (
    <>
      <AnnouncementBanner />
      <NavBar />
      <Slider />
      <Catagories />
      <DummyProducts />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Home;
