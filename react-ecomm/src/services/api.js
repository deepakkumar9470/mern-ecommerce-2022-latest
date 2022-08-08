import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const appApi = createApi({
    reducerPath : 'appApi',
    baseQuery:  fetchBaseQuery({ baseUrl : 'http://localhost:5000/api'}),
    endpoints:  (builder) =>({
        signup : builder.mutation({
            query : (user) =>({
                url : '/user/register',
                method : 'POST',
                body : user
            }),
        }),
        login : builder.mutation({
            query : (user) =>({
                url : '/user/login',
                method : 'POST',
                body : user
            })
        }),
        addNewProduct : builder.mutation({
            query : (product) =>({
                url : '/product',
                method : 'POST',
                body : product
            })
        }),
        addToCart : builder.mutation({
            query : (cartinfo) =>({
                url : '/product/add-to-cart',
                method : 'POST',
                body : cartinfo
            })
        }),
        removeFromCart : builder.mutation({
            query : (body) =>({
                url : '/product/remove-cart',
                body ,
                method : 'DELETE'
            })
        }),
        increaseProductCount : builder.mutation({
            query : (body) =>({
                url : '/product/increase-product-count',
                body ,
                method : 'POST'
            })
        }),
        decreaseProductCount : builder.mutation({
            query : (body) =>({
                url : '/product/decrease-product-count',
                body ,
                method : 'POST'
            })
        }),

        createOrders : builder.mutation({
            query : (body) =>({
                url : '/orders',
                body,
                method : 'POST'
            })
        }),

    })
})

export const {useSignupMutation, 
              useLoginMutation,
              useAddNewProductMutation,
              useAddToCartMutation,
              useRemoveFromCartMutation,
              useIncreaseProductCountMutation,
              useDecreaseProductCountMutation,
              useCreateOrdersMutation} = appApi

export default appApi