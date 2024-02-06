import {all, fork} from 'redux-saga/effects';
import authenticationSaga from './authenticationSaga.ts';
import productsSaga from './productsSaga.ts';

export default function* rootSaga() {
  yield all([fork(authenticationSaga), fork(productsSaga)]);
}
