import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import "./toast-message.css";

function ToastMessage({ bg, title, item ,body}) {
    const [show, setShow] = useState(true);
    return (
        <ToastContainer position="top-end" className="toast-container">
           
           <Toast 
             show={show} 
             onClose={()=>setShow(false)}
             className="d-inline-block m-1" 
             bg={bg} delay={3000} autohide>
          <Toast.Header>
             <strong className="me-auto">{title}</strong>
             <small>now</small>
          </Toast.Header>
          <Toast.Body>
             {body}  
          </Toast.Body>
          </Toast>
        </ToastContainer>
    );
}

export default ToastMessage;