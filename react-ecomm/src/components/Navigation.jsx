import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, NavDropdown, Container,Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './navigation.css'
import {logout} from '../redux/userSlice'
import {FaShoppingCart} from 'react-icons/fa'
const Navigation = () => {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    

    const handleLogout =() =>{
       dispatch(logout())
    }

  return (
    <Navbar className="navbar"  expand="lg">
    <Container>
        <LinkContainer className="nav-link_brand" to="/">
           <Navbar.Brand>d-Commerce</Navbar.Brand>
        </LinkContainer>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          
         {!user && <>
          <LinkContainer className="nav-link" to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/signup" className="nav-link">
            <Nav.Link>SignUp</Nav.Link>
          </LinkContainer>
         </>}
           
           
         { user && !user.isAdmin && <>
              <LinkContainer to="/cart">
                <Nav.Link>
              
                 <FaShoppingCart className="shopping_cart"/>
                {user?.cart.count > 0  && (
                  <span className="badge badge-warning" id="cart_count">
                    {user.cart.count}
                  </span>
                )}
                </Nav.Link>
              </LinkContainer>
             </>}

          {user && (
            <NavDropdown title={`${user.name}`} id="basic-nav-dropdown">

             {user.isAdmin && <>
              <LinkContainer to="/admin" className="nav-link">
              <NavDropdown.Item>Dashboard</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/new-product" className="nav-link">
              <NavDropdown.Item>AddProduct</NavDropdown.Item>
              </LinkContainer>
             </>}


             { !user.isAdmin && <>
              <LinkContainer to="/cart" className="nav-link_user">
              <NavDropdown.Item>Cart</NavDropdown.Item>  
              </LinkContainer>
              <LinkContainer to="/order" className="nav-link_user">
              <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
             </>}

            


             
            <NavDropdown.Divider />
            <Button className="logout_btn" variant="dark" onClick={handleLogout}>Logout</Button>

          </NavDropdown>
          )}

          


        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navigation