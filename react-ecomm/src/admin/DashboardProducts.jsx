import React,{useState,useEffect} from 'react'
import { Container,Row,Col,Table, Button } from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import './admin-dashboard.css'

const DashboardProducts = () => {
    const user = useSelector((state) => state.user)
    const products = useSelector((state) => state.products)

    const handleProductDelete  = () =>{

    }
  return (
    <div>
         <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Id</th>
          <th>Product Name</th>
          <th>Product Price</th>
        </tr>
      </thead>
      <tbody>
      {
            products.map((p) => (
                <tr>
              
                <td>{p.name}</td>
                <td><img src={p.picture[0]} alt="prodcutimg" className="dashboard_img_preview"/></td>
                <td>Rs {p.price}</td>
                <td>
                    <Button onClick={()=> handleProductDelete(p._id, user._id)}>
                    <i className="fa-solid fa-trash"></i>
                    </Button>
                     <Link to={`/product/${p._id}/edit`} 
                           className="btn btn-warning">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Link>   
                </td>
               
              </tr>
            ))
        }
        
       
      </tbody>
    </Table>
    </div>
  )
}

export default DashboardProducts