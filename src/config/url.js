/* @flow */

import { isDevelopment } from './env';

export const port = 1337;
export const origin = isDevelopment
  ? `http://localhost:${port}`
  : 'http://aimirror.website';
// export const endpoint = {
//   landing: '/',
//   home: '/home',
//   userDetail: '/users/:id',
//   about: '/about',
//   redirectAbout: '/redirect-about',
//   notFound: '*',
// };
