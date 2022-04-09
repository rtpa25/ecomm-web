/** @format */
import { configureStore } from '@reduxjs/toolkit';
import prodcutsReducer from './slices/productSlice';
import ordersReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    product: prodcutsReducer,
    orders: ordersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
