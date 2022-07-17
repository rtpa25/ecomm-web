/** @format */

import axios from 'axios';
import Session from 'supertokens-auth-react/recipe/session';

export const __isProd__ = process.env.NODE_ENV === 'production';

const axiosInstance = axios.create({
  baseURL: __isProd__ ? 'https://api.nyka.site' : 'http://localhost:8080',
});

Session.addAxiosInterceptors(axiosInstance);

export default axiosInstance;
