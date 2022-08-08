import { configureStore} from "@reduxjs/toolkit"
import userReducer from './userSlice'
import productReducer from './productSlice'
import appApi from '../services/api'



//persit our store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,
} from 'redux-persist'
import thunk from 'redux-thunk'

// combine reducer
const rootReducer  = combineReducers ({
  user: userReducer,
  products: productReducer,
  [appApi.reducerPath]  : appApi.reducer,
})


const persistConfig = {
  key: "root",
  version   : 1,
  storage,
  blackList: [appApi.reducerPath, "products"],
};

// persist our store
const persistedReducer = persistReducer(persistConfig, rootReducer);


// creating the store

const store = configureStore({
  reducer: persistedReducer,
  middleware:[thunk]
  
});

export default store;