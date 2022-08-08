import React from 'react'


import './product-review.css'
import { Card,Badge} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const SimilarProduct = ({_id, name, category,picture}) => {
  return (
    
    <LinkContainer to={`/product/${_id}}`}
     style={{cursor : 'pointer', margin : '10px', width : "13rem"}}>
            <Card style={{cursor : 'pointer', margin : '10px', width : "20rem"}}>
               <Card.Img src={picture[0]? picture[0]:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdSHtzfa_7mVGCpt-gclVkvN1tGb3kjrIiRA&usqp=CAU'}
                style={{width:'100%', height: "150px", objectFit: "cover" }}
                variant="top" 
                className="product_preview_img"/>

                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Badge bg="warning" text="dark">{category}</Badge>
                </Card.Body>
            </Card>

    </LinkContainer>
  )
}

export default SimilarProduct