import {createSlice} from '@reduxjs/toolkit'

import appApi from '../services/api'

const initialState = []


const productSlice = createSlice({
    name : 'products',
    initialState,
    reducers : {
        getProducts : (_,action) =>{
            return action.payload
        }
        
    },
    extraReducers : (builder) =>{
        builder.addMatcher(appApi.endpoints.addNewProduct.matchFulfilled, (_, {payload}) => payload);
        
    }
});


export const {getProducts}  = productSlice.actions

export default productSlice.reducer