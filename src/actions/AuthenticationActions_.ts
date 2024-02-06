import {createAction} from '@reduxjs/toolkit';
import {LoginRequestParams, User} from '../data';

class AuthenticationActions_ {
  static LOGIN_REQUEST = 'authentication/loginRequest';
  static LOGIN_SUCCESS = 'authentication/loginSuccess';
  static LOGIN_FAILURE = 'authentication/loginFailure';
  static LOGOUT = 'authentication/logout';

  static loginRequest = createAction<{loginRequestParams: LoginRequestParams}>(
    AuthenticationActions_.LOGIN_REQUEST,
  );
  static loginSuccess = createAction<{user: User; token: string}>(
    AuthenticationActions_.LOGIN_SUCCESS,
  );
  static loginFailure = createAction<string>(
    AuthenticationActions_.LOGIN_FAILURE,
  );
  static logout = createAction(AuthenticationActions_.LOGOUT);
}

export default AuthenticationActions_;
