import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0, changed: false },

  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addItemsToCart(state, action) {
      state.totalQuantity++;
      const newItem = action.payload;
      const existingItem = state.items.find((f) => f.id === newItem.id);
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: parseFloat(newItem.quantity) * parseFloat(newItem.price),
          name: newItem.title,
          description: newItem.description,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice +=
          parseFloat(newItem.quantity) * parseFloat(newItem.price);
      }
    },
    removeItemsToCart(state, action) {
      const id = action.payload;
      state.totalQuantity--;
      const existingItem = state.items.find((f) => f.id === id);
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((filter) => filter.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
