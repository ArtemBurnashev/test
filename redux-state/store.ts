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
import likeReducer from './features/likes';
import sidebarReducer from './features/sidebar';
import filterReducer, {
  clearFilters,
  filterAttributes,
} from './features/filter';

const storageMiddleware = createListenerMiddleware();

storageMiddleware.startListening({
  matcher: isAnyOf(addToCart, clearCart, removeItem, toggleAmout),
  effect: (action, api) => {
    api.dispatch(calculateSum());
  },
});

storageMiddleware.startListening({
  matcher: isAnyOf(filterAttributes),
  effect: (action, api) => {
    const { filter } = api.getState() as RootState;
    if (filter.attributes?.length === 1) {
      if (filter.attributes[0].values.length === 0) {
        api.dispatch(clearFilters());
      }
    }
  },
});

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    like: likeReducer,
    sidebar: sidebarReducer,
    filter: filterReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storageMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
