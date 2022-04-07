/** @format */

import type { NextPage } from 'next';
import {
  AnnouncementBanner,
  NavBar,
  Slider,
  Catagories,
} from '../components/Zexporter';

const Home: NextPage = () => {
  return (
    <>
      <AnnouncementBanner />
      <NavBar />
      <Slider />
      <Catagories />
    </>
  );
};

export default Home;
