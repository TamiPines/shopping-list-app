import { createSlice } from '@reduxjs/toolkit';

type CartItem = {
  id: string;
  name: string;
  qty: number;
};

type Cart = {
  [category: string]: CartItem[];
};

const initialState = {
  items: {} as Cart,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { category, name, qty } = action.payload;
      if (!state.items[category]) state.items[category] = [];
      // בדיקה האם המוצר כבר קיים בקטגוריה
      const existing = state.items[category].find(item => item.name === name);
      if (existing) {
        existing.qty += qty;
      } else {
        state.items[category].push({
          id: Date.now().toString() + Math.random(), 
          name,
          qty,
        });
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;