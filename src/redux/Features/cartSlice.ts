import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProductTyper = {
  _id: string;
  name: string;
  description: string;
  imgUrls: [string];
  inStock: number;
  categoryId: CategoryType;
  price: number;
  brand: string;
  rating: number;
  colors: [string];
  createdAt: string;
  updatedAt: string;
  reviews: [ReviewType];
};



interface CartState {
  productCartQty: number;
  cartPrdcts: ProductTyper[];
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
    setCartPrdcts: (state, action: PayloadAction<ProductType[]>) => {
      state.cartPrdcts = action.payload;
      saveCartToLocalStorage(state);
    },
    addToBasket: (state, action: PayloadAction<ProductTyper>) => {
    
        
        const index = state.cartPrdcts.findIndex(cart => cart._id === action.payload._id);
        if (index > -1) {
          // Sepette ürün varsa, adeti 1 arttır
         state.cartPrdcts[index].inStock += 1;
       
        }
       
      
      else {
        // Eğer sepette hiç ürün yoksa, yeni ürün ekle
        state.cartPrdcts.push({ ...action.payload, inStock: 1 });
      }
      // LocalStorage'a kaydet
      saveCartToLocalStorage(state);
    },
    
       /*  const index = state.cartPrdcts.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.cartPrdcts[index] = {
            ...state.cartPrdcts[index],
            inStock: state.cartPrdcts[index]!.inStock + 1,
          };
        }
        //state.cartPrdcts.push(action.payload);
        else {
         // state.cartPrdcts = [action.payload];
          state.cartPrdcts!.push(action.payload)
        } */
      
     
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
      state.cartPrdcts = [];
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