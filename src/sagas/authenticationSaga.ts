import {call, put, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {loginFailure, loginRequest, loginSuccess} from '../reducers';
import _URLs from '../constants/_URLs.ts';
import {mockUser} from '../data/dao/User.ts';
import {loginUser} from '../actions/authActions.ts';
import {api} from '../network/Api.ts';

type ApiResponse<T> = AxiosResponse<T>;

/*
const userLoginPayload = (userObj: any) => ({
  username: userObj.userName,
  //password: userObj.password,
  password: //dataEncryption(userObj.password),
});
*/

const logInUser = (action: any) => {
  return api({
    method: 'post',
    url: _URLs.Authentication.login.path,
    data: action.payload,
    header: {
      Accept: 'application/json',
    },
  });
};

function* initiateLogin(action: any) {
  try {
    yield put(loginRequest());
    let response: ApiResponse<any> = yield call(logInUser, action);
    //let response: ServerResponse = yield call(logInUser, action);
    console.log('response', response.data);
    if (response.status === 200) {
      const {token} = response.data;
      yield put(loginSuccess({user: mockUser, token: token}));
    } else {
      yield put(loginFailure(response.statusText));
    }
  } catch (error) {
    yield put(loginFailure((error as Error).message));
  }
}

function* authenticationSaga() {
  yield takeLatest(loginUser, initiateLogin);
}

export default authenticationSaga;
