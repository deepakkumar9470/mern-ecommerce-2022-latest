import React from 'react'
import { Card, Container ,Badge} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import './product-review.css'

const ProductPreview = ({_id,name,picture,category}) => {
   
  return (
  

    <LinkContainer to={`/product/${_id}`}
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

export default ProductPreview