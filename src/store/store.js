import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

export const rootReducer = combineReducers({
    user : userReducer
});

const persistConfig = {
    key : "root",
    storage,
}

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleWare) => getDefaultMiddleWare({serializableCheck : false}),
});

export const persistor = persistStore(store);