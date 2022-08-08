import React,{useState,useEffect} from 'react'
import {Container,Button,Row,Col, Form,Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useLoginMutation } from '../services/api'
import  './login.css'

const MyLogin = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [login,{ error, isLoading, isError }] = useLoginMutation()

    const loginHandler = (e) =>{
        e.preventDefault()
        login({ email, password });
        
    }

  return (
    <Container>
        <Row>
            <Col md={6} className="login_form">
                <Form style={{width :  "100%"}} onSubmit={loginHandler}>
                    <h2>Login to your account</h2>
                    {isError && <Alert variant="danger">{error.data}</Alert>}
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          className="input" 
                          type="email" 
                          value={email}
                          required
                          onChange={(e)=>setEmail(e.target.value)}
                          placeholder="Enter email"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          className="input" 
                           type="password" 
                           value={password}
                           required
                           onChange={(e)=>setPassword(e.target.value)}
                           placeholder="Enter password"/>
                    </Form.Group>

                    <Form.Group>
                       <Button className="login_btn" type="submit" disabled={isLoading}>Login</Button>
                       <p className="para">Don't have account create account 
                         <Link className="para_link" to="signup">SignUp</Link></p>
                    </Form.Group>

                </Form>
            </Col>
            <Col md={5} className="login_image_container"></Col>
        </Row>
    </Container>
  )
}

export default MyLogin