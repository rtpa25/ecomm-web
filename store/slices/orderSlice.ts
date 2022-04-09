/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import order from '../../types/orders';

const initalState: {
  res: order[];
} = {
  res: [
    {
      id: 0,
      address: '',
      created_at: '',
      prodcut_id: 0,
      quantity: 0,
      selected_size: '',
      status: 1,
      updated_at: '',
      user_id: 1,
    },
  ],
};

const OrdersSlice = createSlice({
  name: 'orders',
  initialState: initalState,
  reducers: {
    setOrders: (state, action: PayloadAction<{ data: order[] }>) => {
      state.res = action.payload.data;
    }, //will be used in the navbar to set the orders fetched from the network
    pushOrder: (state, action: PayloadAction<{ order: order }>) => {
      state.res = [...state.res, action.payload.order];
    }, //this will be used in the individual product page after the order has been created
  },
});

export const { setOrders, pushOrder } = OrdersSlice.actions;
export default OrdersSlice.reducer;
