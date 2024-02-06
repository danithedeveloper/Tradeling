import {AxiosResponse} from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
} from '../reducers';
import {api} from '../network/Api.ts';
import _URLs from '../constants/_URLs.ts';
import {fetchProducts} from '../actions/productActions.ts';

type ApiResponse<T> = AxiosResponse<T>;

const _fetchProducts = (action: any) => {
  return api({
    method: 'get',
    url: _URLs.Product.AllProducts.path,
    //data: action.payload,
    header: {
      Accept: 'application/json',
    },
  });
};

function* initiateFetchProducts(action: any) {
  try {
    yield put(fetchProductsRequest());
    let response: ApiResponse<any> = yield call(_fetchProducts, action);
    //let response: ServerResponse = yield call(logInUser, action);
    console.log('response', response.data);
    if (response.status === 200) {
      const _products = response.data;
      yield put(fetchProductsSuccess({products: _products}));
    } else {
      yield put(fetchProductsFailure(response.statusText));
    }
  } catch (error) {
    yield put(fetchProductsFailure((error as Error).message));
  }
}

function* productsSaga() {
  yield takeLatest(fetchProducts, initiateFetchProducts);
}

export default productsSaga;
