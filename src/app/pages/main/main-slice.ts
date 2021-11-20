import {createSlice} from "@reduxjs/toolkit";
import {IProduct} from "./types";

export interface InitialState {
    shoppingList: IProduct[]
    allProducts: IProduct[]
}

export const mainInitialState: InitialState = {
    shoppingList: [],
    allProducts: []
};

export const mainSlice = createSlice({
    initialState: mainInitialState,
    name: 'main',
    reducers: {
        buyProduct(state, action) {
            state.shoppingList.forEach(item => item.id === action.payload ? state.allProducts.push(item) : null)
            state.shoppingList = state.shoppingList.filter(item => item.id !== action.payload)
        },
        addProduct(state, action) {
            state.allProducts.push(action.payload)
        },
        addToBasket(state, action) {
            state.allProducts.forEach(item => item.id === action.payload ? state.shoppingList.push(item) : null)
            state.allProducts = state.allProducts.filter(item => item.id !== action.payload)
        },
        removeProduct(state, action) {
            state.allProducts = state.allProducts.filter(item => item.id !== action.payload)
        }
    }
});
export const {buyProduct, addProduct, addToBasket, removeProduct} = mainSlice.actions;
export default mainSlice.reducer;