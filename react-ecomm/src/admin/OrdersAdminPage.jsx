
import React,{useState,useEffect} from 'react'


import {Container,Row,Col,Button,Table, Badge} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from '../axios'
import { useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Loading from '../components/Loading' 


const OrdersAdminPage = () => {
    const user = useSelector((state)=> state.user)
    const products = useSelector((state)=> state.products)
    const [orders,setOrders] = useState([])
    const [loading,setLoading] = useState(false)
    const [show,setShow] = useState(false)    
    const [orderToShow,setOrderToShow] = useState([]) 
    
  useEffect(() => {
    setLoading(true)
    axios.get(`/orders`)
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
          <th>Client Name</th>
          <th>Item</th>
          <th>Order Total</th>
          <th>Address</th>
         
        </tr>
      </thead>
      <tbody>
        {
            orders.map((order) => (
                <tr>
                 <td>{order._id}</td> 
                 <td>{order.owner?.name}</td> 
                 <td>{order.count}</td> 
                 <td> Rs {order.total}</td> 
                 <td>{order.address}</td> 
                <td>
                  {
                    orders.status === "processing" ? 
                    (<Button>Marked as shipped</Button>):
                    (<Badge bg="sucsess">Shipped</Badge>)
                  }
                </td>
                
               
              </tr>
            ))
        }
        
       
      </tbody>
    </Table>
    </Container>
  )
}

export default OrdersAdminPage