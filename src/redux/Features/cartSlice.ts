import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface CartState {
  productCartQty: number;
  cartPrdcts: ProductType[] | null;
}
const getInitialCartState = (): CartState => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  }
  return {
    productCartQty: 0,
    cartPrdcts: [],
  };
};
const initialState: CartState = getInitialCartState();

const saveCartToLocalStorage = (state: CartState) => {
  localStorage.setItem('cart', JSON.stringify(state));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartPrdcts: (state, action: PayloadAction<ProductType[] | null>) => {
      state.cartPrdcts = action.payload;
      saveCartToLocalStorage(state);
    },
    addToBasket: (state, action: PayloadAction<ProductType>) => {
      if (state.cartPrdcts) {
        state.cartPrdcts.push(action.payload);
      } else {
        state.cartPrdcts = [action.payload];
      }
      saveCartToLocalStorage(state);
    },
    addToBasketIncrease: (state, action: PayloadAction<ProductType>) => {
      if (state.cartPrdcts) {
        const index = state.cartPrdcts.findIndex(item => item._id === action.payload._id);
        if (index > -1 && state.cartPrdcts[index].inStock < 10) {
          state.cartPrdcts[index].inStock++;
        }
      }
      saveCartToLocalStorage(state);
    },
    addToBasketDecrease: (state, action: PayloadAction<ProductType>) => {
      if (state.cartPrdcts) {
        const index = state.cartPrdcts.findIndex(item => item._id === action.payload._id);
        if (index > -1 && state.cartPrdcts[index].inStock > 1) {
          state.cartPrdcts[index].inStock--;
        }
      }
      saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<ProductType>) => {
      if (state.cartPrdcts) {
        state.cartPrdcts = state.cartPrdcts.filter(item => item._id !== action.payload._id);
      }
      saveCartToLocalStorage(state);
    },
    removeCart: (state) => {
      state.cartPrdcts = null;
      saveCartToLocalStorage(state);
    },
    setProductCartQty: (state) => {
      state.productCartQty = state.cartPrdcts ? state.cartPrdcts.length : 0;
      saveCartToLocalStorage(state);
    },
  },
});

export const {
  setCartPrdcts,
  addToBasket,
  addToBasketIncrease,
  addToBasketDecrease,
  removeFromCart,
  removeCart,
  setProductCartQty,
} = cartSlice.actions;

export default cartSlice.reducer;
