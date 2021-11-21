import {createSlice} from "@reduxjs/toolkit";
import {INotification, IProduct} from "./types";


export interface InitialState {
    shoppingList: IProduct[]
    allProducts: IProduct[]
    notification: INotification
}

export const mainInitialState: InitialState = {
    shoppingList: [],
    allProducts: [],
    notification: {
        show: false,
        text: '',
        type: ''
    }
};

export const mainSlice = createSlice({
    initialState: mainInitialState,
    name: 'main',
    reducers: {
        buyProduct(state, action) {
            state.shoppingList.forEach(item => item.id === action.payload ? state.allProducts.push(item) : null)
            state.shoppingList = state.shoppingList.filter(item => item.id !== action.payload)
            state.notification = {show: true, text: 'Продукт удален из списка покупок', type: 'removeProduct'}
        },
        addProduct(state, action) {
            state.allProducts.push(action.payload)
            state.notification = {show: true, text: 'Продукт успешно создан', type: 'createProduct'}
        },
        addToBasket(state, action) {
            state.allProducts.forEach(item => item.id === action.payload ? state.shoppingList.push(item) : null)
            state.allProducts = state.allProducts.filter(item => item.id !== action.payload)
            state.notification = {show: true, text: 'Продукт добавлен в корзину', type: 'addToBasket'}
        },
        removeProduct(state, action) {
            state.allProducts = state.allProducts.filter(item => item.id !== action.payload)
            state.notification = {show: true, text: 'Продукт удален', type: 'removeProduct'}
        },
        hideNotification(state) {
            state.notification = {show: false, text: '', type: ''}
        }
    }
});
export const {buyProduct, addProduct, addToBasket, removeProduct, hideNotification} = mainSlice.actions;
export default mainSlice.reducer;