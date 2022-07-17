/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ListAllProductsResType from '../../types/products';

const initalState: ListAllProductsResType = {
  result: [
    {
      product: {
        id: '',
        created_at: '',
        description: '',
        image_id: '',
        image_url:
          'https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png',
        name: '',
        price: '',
        updated_at: '',
      },
      available_sizes: [''],
      catagories: [''],
    },
  ],
};

const ProductSlice = createSlice({
  name: 'products',
  initialState: initalState,
  reducers: {
    setProductsData: (
      state: ListAllProductsResType,
      action: PayloadAction<{ data: ListAllProductsResType }>
    ) => {
      state.result = action.payload.data.result;
    }, //this will be used in the products page to store the data of products after the network request
  },
});

export const { setProductsData } = ProductSlice.actions;
export default ProductSlice.reducer;
