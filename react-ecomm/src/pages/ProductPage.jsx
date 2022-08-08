import React,{useState,useEffect} from 'react'

import axios from '../axios'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import {Container, Col, Row ,Badge,ButtonGroup,Form,Button} from 'react-bootstrap'
import AliceCarousel from 'react-alice-carousel'
import Loading from '../components/Loading'
import SimilarProduct from '../components/SimilarProduct'
// import 'react-alice-carousel/lib/alice-carousel.css';
import ToastMessage from '../components/ToastMessage'
import './product-page.css'
import { useAddToCartMutation } from '../services/api'

const ProductPage = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  console.log(id)
  const user = useSelector((state) => state.user)
  const [product, setProduct] = useState(null);
//   console.log(product.picture)
  const [similar, setSimilar] = useState(null);
  const handleDragStart = (e) => e.preventDefault();

  const [addToCart, {isError, isLoading, error, isSuccess}] = useAddToCartMutation()

  useEffect(() => {
    axios.get(`/product/${id}`).then(({ data }) => {
      setProduct(data);
      // setSimilar(data.similar);
  });
 }, [id]);

 console.log("from product page",product)

if (!product) {
  return <Loading />;
}

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const images = product.picture.map((picture) => 
     <img className="product__carousel--image" 
       src={picture} 
       onDragStart={handleDragStart} />);

let similarProducts = [];
    if (similar) {
        similarProducts = similar.map((product, idx) => (
            <div className="item" data-value={idx}>
                <SimilarProduct {...product} />
            </div>
        ));
    }

 

 
  return (
    <Container className="pt-4 mt-5 product_page" style={{position : "relative"}}>

        <Row>
            <Col md={6} className="mt-5">
                 {/* <img src={p} alt="p" />*/}
                 <AliceCarousel 
                    autoPlay= "true"  
                    responsive={responsive}
                    mouseTracking 
                    items={images} 
                    controlsStrategy="alternate"/>
            </Col>
            <Col lg={6} className="pt-4">
                    <h1>{product.name}</h1>
                    <p>
                        <Badge bg="primary">{product.category}</Badge>
                    </p>
                    <p className="product__price">Rs {product.price} /-</p>
                    <p style={{ textAlign: "justify" }} className="py-3">
                        <strong>{product.description}</strong> 
                    </p>
                    {user && !user.isAdmin && (
                        <ButtonGroup style={{ width: "90%" }}>
                            <Form.Select size="lg" style={{ width: "40%", borderRadius: "0" }}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                            <Button size="lg" onClick={() => addToCart({ userId: user._id, productId: id, price: product.price, image: product.picture[0] })}>
                                Add to cart
                            </Button>
                        </ButtonGroup>
                    )}
                    {user && user.isAdmin && (
                        <LinkContainer to={`/product/${product._id}/edit`}>
                            <Button size="lg">Edit Product</Button>
                        </LinkContainer>
                    )}
                    {isSuccess && <ToastMessage bg="info" title="Added to cart" body={`${product.name} is in your cart`} />}
                </Col>
        </Row>
    </Container>
  )
}

export default ProductPage