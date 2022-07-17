/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import order from '../../types/orders';

interface OrderState {
  res: order[];
}

const initalState: OrderState = {
  res: [],
};

const OrdersSlice = createSlice({
  name: 'orders',
  initialState: initalState,
  reducers: {
    setOrders: (
      state: OrderState,
      action: PayloadAction<{ data: order[] }>
    ) => {
      state.res = action.payload.data;
    }, //will be used in the navbar to set the orders fetched from the network
    pushOrder: (state: OrderState, action: PayloadAction<{ order: order }>) => {
      state.res = [...state.res, action.payload.order];
    }, //this will be used in the individual product page after the order has been created
    updateOrder: (
      state: OrderState,
      action: PayloadAction<{ id: number; updatedQuantity: number }>
    ) => {
      for (let i = 0; i < state.res.length; i++) {
        let element = state.res[i];
        if (element.id === action.payload.id) {
          element.quantity = action.payload.updatedQuantity;
        }
      }
    }, //this will be used to update the quantity of the order in the cart page
    delteOrder: (
      state: OrderState,
      action: PayloadAction<{ orderId: number }>
    ) => {
      state.res = state.res.filter((o) => {
        if (o.id !== action.payload.orderId) {
          return o;
        }
      });
    }, //used in the cart page
  },
});

export const { setOrders, pushOrder, updateOrder, delteOrder } =
  OrdersSlice.actions;
export default OrdersSlice.reducer;
