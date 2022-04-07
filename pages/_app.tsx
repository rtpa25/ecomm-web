/** @format */

import '../styles/globals.css';
import { AppProps } from 'next/app';
import SuperTokensReact from 'supertokens-auth-react';
import { frontendConfig } from '../config/frontEndConfig';

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

// Create a client

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
