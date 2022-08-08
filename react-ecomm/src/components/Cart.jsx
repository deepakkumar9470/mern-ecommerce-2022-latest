import React from 'react'
import {Container,Row,Col,Alert,Table} from 'react-bootstrap'
import './cart.css'
import {useSelector} from 'react-redux'
import {FaMinusCircle,FaPlusCircle,FaTimes,FaRupeeSign} from 'react-icons/fa'
import {useRemoveFromCartMutation,useIncreaseProductCountMutation
,useDecreaseProductCountMutation} from '../services/api'

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm'
const stripePromise = loadStripe('pk_test_51JGyipSFX1ZjZrKwUnJ6nJzWOCer6vHSSvDuRTY7eZ7QcUW61S4NXfV1yvRcaUogtLraKHtRF3');

const Cart = () => {
  const user = useSelector((state) => state.user)
  const products = useSelector((state) => state.products)
  const userCartObj = user.cart;

  let cart = products.filter((product) => userCartObj[product._id] !== null);
  

  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation()
  const [increaseProductCount] = useIncreaseProductCountMutation()
  const [decreaseProductCount] = useDecreaseProductCountMutation()
 
  

  const handleDecrease = (product) =>{
    const quantity = user.cart.count;
    if (quantity <= 0) return alert("Can't proceed");
    decreaseProductCount(product);
  }

  // const options = {
  
  //   clientSecret: process.env.CLIENT_SECRET,
  // };
  return (
    <Container style={{minHeight : '90vh'}} className="cart_container mt-5">
         <Row>
            <Col md={6}>
            <h1 className=" pt-3 h-3">Shopping Cart</h1>
            { cart.length === 0  ?
              <Alert variant="info">
              Shopping cart is empty , please add item to purchase!
              </Alert>
              :
              <Elements stripe={stripePromise}>
                <CheckOutForm/>
              </Elements>
            }
            </Col>

             {cart.length > 0 && (
                    <Col md={6}>
                        <>
                            <Table responsive="sm" className="cart-table">
                                <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* loop through cart products */}
                                    {cart.map((item) => (
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>
                                                 <FaTimes 
                     onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })}                                                   style={{ marginRight: 10, cursor: "pointer" }} />
                                                 <img src={item.picture[0]} style={{ width: 80, height: 80, objectFit: "cover" }} />
                                            </td>
                                            <td> <FaRupeeSign/> {item.price}</td>
                                            <td>
                                                <span className="quantity-indicator">
                                                    <FaMinusCircle 
                                                      className="minus"
                                                      onClick={() => handleDecrease({ productId: item._id, price: item.price, userId: user._id })}/>
                                                    <span>{user.cart[item._id]}</span>
                                                    <FaPlusCircle 
                                                       onClick={()=> increaseProductCount({productId: item._id, price: item.price, userId: user._id })}  
                                                      className="plus"/>
                                                </span>
                                            </td>
                                            <td><FaRupeeSign/>{item.price * user.cart[item._id]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                  <div>
                     <h3 className="h4 pt-4">Total: <FaRupeeSign/> {user.cart.total} /-</h3>
                  </div>
                        </>
                    </Col>
                )}
            
         </Row>
    </Container>
  )
}

export default Cart