/** @format */

import { __isProd__ } from '../utils';

export const appInfo = {
  appName: 'ecomm',
  apiDomain: __isProd__ ? 'https://api.nyka.site' : 'http://localhost:8080',
  websiteDomain: __isProd__ ? 'https://nyka.site' : 'http://localhost:3000',
  apiBasePath: '/auth',
  websiteBasePath: '/auth',
};
