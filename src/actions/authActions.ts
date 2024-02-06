import {createAction} from '@reduxjs/toolkit';
import {LoginRequestParams, User} from '../data';

/*export interface LoginRequestParams {
  username: string;
  password: string;
}*/

export const loginUser = createAction<LoginRequestParams>('auth/loginStart');
export const loginSuccess = createAction<{user: User; token: string}>(
  'auth/loginSuccess',
);
export const loginFailure = createAction<string>('auth/loginFailure');
