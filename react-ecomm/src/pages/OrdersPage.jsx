
import React,{useState,useEffect} from 'react'

import './order-page.css'
import {Container,Row,Col,Button,Table, Badge} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from '../axios'
import { useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Loading from '../components/Loading' 


const OrdersPage = () => {
    const user = useSelector((state)=> state.user)
    const products = useSelector((state)=> state.products)
    const [orders,setOrders] = useState([])
    const [loading,setLoading] = useState(false)
    const [show,setShow] = useState(false)    
    const [orderToShow,setOrderToShow] = useState([]) 
    
  useEffect(() => {
    setLoading(true)
    axios.get(`/user/${user._id}/orders`)
    .then(({data}) =>{
      setLoading(false)
      setOrders(data)
  })
  .catch((err)=>{
    setLoading(false)
    console.log(err)
  })
  }, [])   

  if(loading) return <Loading/>
  
  if(orders.length === 0) {
    return <h1 className="text-center pt-3">No Orders Yet</h1>

  }
  return (
    <Container>
        <h2 className="text-center text-bg-info">Your Orders</h2>
        
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Status</th>
          <th>Total</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {
            orders.map((order) => (
                <tr>
                 <td>{order._id}</td> 
                <td>
                    <Badge 
                       bg={`${order.status == "processing" ? "warning" : "success"}`}>
                        {order.status}</Badge>
                </td>
                <td><i className="fa-solid fa-indian-rupee-sign"></i> {order.total}</td>
               
              </tr>
            ))
        }
        
        
       
      </tbody>
    </Table>
    </Container>
  )
}

export default OrdersPage