import React,{useState,useEffect} from 'react'
import {Container,Button,Row,Col, Form, Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import  './signup.css'
import { useSignupMutation } from '../services/api'

const MySignUp = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [signup,{ error, isLoading, isError }] = useSignupMutation()

    const signupHandler = (e) =>{
        e.preventDefault()
        signup({ name, email, password });
        setName('')
        setEmail('')
        setPassword('')
         
    }

  return (
    <Container>
        <Row>
            <Col md={6} className="register_form">
                <Form style={{width :  "100%"}} onSubmit={signupHandler}>
                    <h2>Signup to your account</h2>
                    {isError && <Alert variant="danger">{error.data}</Alert>}
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          className="input" 
                          type="text" 
                          value={name}
                          required
                          onChange={(e)=>setName(e.target.value)}
                          placeholder="Enter name"/>
                    </Form.Group>

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
                       <Button className="login_btn" type="submit" disabled={isLoading}>Signin</Button>
                       <p className="para">Already have account create account 
                         <Link className="para_link" to="login">Signin</Link></p>
                    </Form.Group>

                </Form>
            </Col>
            <Col md={5} className="register_image_container"></Col>
        </Row>
    </Container>
  )
}

export default MySignUp