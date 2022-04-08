/** @format */

import dynamic from 'next/dynamic';
import { FC } from 'react';

const NoSsr: FC = (props) => <>{props.children}</>;

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
