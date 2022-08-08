
import React,{useState,useEffect} from 'react'


import './admin-dashboard.css'
import {Container,Row,Col,Tab, Nav} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from '../axios'
import DashboardProducts from './DashboardProducts'
import OrdersAdminPage from './OrdersAdminPage'
import ClientsAdminPage from './OrdersAdminPage'

const Dashboard = () => {
  return (
    <Container className="mt-5 pt-5">
      <Tab.Container defaultActiveKey="products">
        <Row>
          <Col md ={3}>
            <Nav variant="pills" className="d-flex flex-column">
              <Nav.Item>
                <Nav.Link className="admin_links"  eventkey="products">Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="admin_links" eventkey="orders">Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="admin_links" eventkey="clients">Clients</Nav.Link>
              </Nav.Item>
            </Nav>

          </Col>

          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="products">
                 <DashboardProducts/>
              </Tab.Pane>

              <Tab.Pane eventKey="orders">
                 <OrdersAdminPage/>
              </Tab.Pane>
            </Tab.Content>


            <Tab.Content>
            <Tab.Pane eventKey="clients">
                 <ClientsAdminPage/>
              </Tab.Pane>
            </Tab.Content>

            
           

          </Col>
        </Row>
      </Tab.Container>
    </Container>
  )
}

export default Dashboard