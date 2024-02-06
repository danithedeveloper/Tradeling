import {createAction} from '@reduxjs/toolkit';

export const fetchProducts = createAction('product/getProducts');
/*export const loginSuccess = createAction<{user: User; token: string}>(
  'auth/loginSuccess',
);
export const loginFailure = createAction<string>('auth/loginFailure');*/
