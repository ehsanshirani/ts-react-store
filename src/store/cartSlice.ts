import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  price: number;
  quantity: number;
  name: string;
  image: string;
}

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  counter: number;
}

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
  counter: 0,
};

const updateTotals = (state: CartState) => {
  const { total, quantity } = state.cartItems.reduce(
    (initial, item) => {
      initial.total += item.price * item.quantity;
      initial.quantity += item.quantity;
      return initial;
    },
    { total: 0, quantity: 0 }
  );

  state.totalPrice = total;
  state.counter = quantity;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.cartItems.findIndex(
        (i) => i.id === action.payload.id
      );

      if (itemIndex > -1) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      updateTotals(state);
    },
    removeItemFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const itemIndex = state.cartItems.findIndex(
        (i) => i.id === action.payload.id
      );

      if (itemIndex === -1) return;
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (i) => i.id !== action.payload.id
        );
      }

      updateTotals(state);
    },
    deleteFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.id !== action.payload.id
      );
      updateTotals(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.counter = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, deleteFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
