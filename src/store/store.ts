import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartItemsReducer from "./cartSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cartItems: cartItemsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
