import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {mainInitialState} from "../pages/main/main-slice";
import mainSliceReducer from "../pages/main/main-slice";

export const rootReducer = combineReducers({
    main: mainSliceReducer

});
const store = configureStore({
    preloadedState: {
        main: mainInitialState,
    },
    reducer: rootReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default store;