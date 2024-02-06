import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authenticationSlice from '../reducers/authenticationSlice.ts';
import rootSaga from '../sagas';
import productsSlice from '../reducers/productsSlice.ts';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authenticationSlice,
  products: productsSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
