import axios from "../axios";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import categories from "../categories ";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import ProductPreview from "./ProductPreview";
import { getProducts } from "../redux/productSlice";
import banner from '../images/banner.png'
import bg from '../images/main-bg.png'
const Home = () => {

  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  console.log(products)

  const lastProducts = products.slice(0, 5);
  console.log('lastProducts', lastProducts)

  useEffect(() => {
    axios.get("/product").then(({ data }) => 
         dispatch(getProducts(data))
    );          
  }, [])
  
  return (
    <div>
        <img className="head_img" src={banner} alt="banner" />  
        <div className="featured_products_container container mt-4">
            <h2>Last products</h2>
            <div className="d-flex justify-content-center flex-wrap">
              {lastProducts.map((product)=>(
                  <ProductPreview {...product}/>
              ))}
            </div>

        <div>
            <Link to="/category/all" style={{textAlign : 'right', display : 'block', textDecoration: 'none'}}>
                 See More {">>"}
            </Link>
        </div>

        </div>

        <div className="sales_banner_container mt-4">

          <img src={bg} alt="bg" /> 
        </div>

        <div className="recent_products_container mt-4">
           <h2>Categories</h2>
           <Row>
              {categories.map((cat)=>(
                <LinkContainer to={`/category/${cat.name.toLocaleLowerCase()}`}>
                  <Col md={4}>
                  <div  style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${cat.img})`, gap: "5px", padding: '0 20px !important' }} className="category-tile">
                    {cat.name}
                  </div>
                  </Col>
                </LinkContainer>
              ))}
            
            </Row>
        </div>

    </div>
  )
}

export default Home