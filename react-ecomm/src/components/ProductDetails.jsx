import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './product-details.css' 
import bag from '../images/bag.jpg'
const ProductDetails = () => {
    const [product,setProduct] = useState({})
    const {id} = useParams()
    console.log(id)

    useEffect(() => {
        const fetchProducts = async () =>{
            try {
              const res = await axios.get(`/product/${id}`)
              console.log(res.data)
              setProduct(res.data.data)
            } catch (error) {
              console.log(error)
            }
          }
          fetchProducts()
    }, [])
    
    
 
  return (
        <div className="product_details_container container single_product">

          <div className="row">
            <div className="col-6">
              <img src={bag} alt="bag" width="80%" />
                <div className="small-img-row">
                  <div className="small-img-col">
                   <img src={bag} alt="bag" width="80%"  />
                  </div>
                  <div className="small-img-col">
                   <img src={bag} alt="bag" width="80%"  />
                  </div>
                  <div className="small-img-col">
                   <img src={bag} alt="bag" width="80%"  />
                  </div>
                  <div className="small-img-col">
                   <img src={bag} alt="bag" width="80%"  />
                  </div>

                </div>
            </div>

            <div className="col-5">
              <p>Bag</p>
              <h1>Bag for buy</h1>
              <h4>Rs 499/-</h4>
              <select>
                <option>Select Item</option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
              </select>
              <button className="btn btn-primary mt-3">Add to Cart</button>
              <h3>Product Details</h3>
              <p className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Placeat, exercitationem.</p>
            </div>
          </div>
              
        </div>
  )
}

export default ProductDetails