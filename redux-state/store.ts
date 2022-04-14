import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';
import cartReducer, {
  addToCart,
  calculateSum,
  clearCart,
  removeItem,
  toggleAmout,
} from './features/cart-slice';

import userReducer from './features/user-slice';
import likeReducer from "./features/likes";
import sidebarReducer from "./features/sidebar"

const storageMiddleware = createListenerMiddleware();

storageMiddleware.startListening({
  matcher: isAnyOf(addToCart, clearCart, removeItem, toggleAmout),
  effect: (action, api) => {
    api.dispatch(calculateSum());
  },
});

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    like: likeReducer,
    sidebar: sidebarReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storageMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
