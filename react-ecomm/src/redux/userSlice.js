import {createSlice} from '@reduxjs/toolkit'
import appApi from '../services/api';


// addToCart
// removeProductFromCart
// increaseCartCount
// decreaseCartCount

// addToCart
// removeFromCart
// increaseProductCount
// decreaseProductCount

const initialState = null;


const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
          logout :() =>initialState,
          
    },

    extraReducers : (builder) =>{
        builder.addMatcher(appApi.endpoints.signup.matchFulfilled, (_, {payload}) => payload);
        builder.addMatcher(appApi.endpoints.login.matchFulfilled, (_, {payload}) => payload);
        builder.addMatcher(appApi.endpoints.addToCart.matchFulfilled, (_, {payload}) => payload);
        builder.addMatcher(appApi.endpoints.removeFromCart.matchFulfilled, (_, {payload}) => payload);
        builder.addMatcher(appApi.endpoints.increaseProductCount.matchFulfilled, (_, {payload}) => payload);
        builder.addMatcher(appApi.endpoints.decreaseProductCount.matchFulfilled, (_, {payload}) => payload);
        builder.addMatcher(appApi.endpoints.createOrders.matchFulfilled, (_, {payload}) => payload);
    }

});


export const {logout}  = userSlice.actions

export default userSlice.reducer