import {Product} from '../data';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: state => {
      console.log('action - fetchProductsRequest - called');
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (
      state,
      action: PayloadAction<{products: Product[]}>,
    ) => {
      (state.products = action.payload.products), (state.loading = false);
      state.error = null;
      console.log('action - loginSuccess - called');
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      console.log('action - loginFailure - called');
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} = productsSlice.actions;
export default productsSlice.reducer;
