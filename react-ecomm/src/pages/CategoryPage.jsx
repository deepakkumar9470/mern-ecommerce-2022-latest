import React,{useState,useEffect} from 'react'
import './category-page.css'
import {Container,Row,Col,Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from '../axios'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading' 
import ProductPreview from '../components/ProductPreview'

const CategoryPage = () => {
  const {category} = useParams()
  console.log('category page :',category)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTrem] = useState('')

  useEffect(() => {
    setLoading(true)
    axios.get(`/product/category/${category}`)
    .then(({data}) =>{
      setLoading(false)
      setProducts(data)
  })
  .catch((err)=>{
    setLoading(false)
    console.log(err)
  })
  }, [category])

  if(loading) return <Loading/>

  const productsSearch = products?.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  console.log('productsSearch :',productsSearch)

  return (
    <div className="category_page_container">
        <div className={`pt-3 ${category}_banner_container category_banner_container`}>
          <h1 className="text-center">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
        </div>

           <div className="filters_container d-flex justify-content-center pt-4 pb-4">
               <input 
                   type="text" 
                   placeholder="Search Items" 
                   onChage={(e)=>setSearchTrem(e.target.value)} 
                />
           </div>

           {productsSearch?.length === 0 ? 
            <h2 className=" text-center">No Product to show</h2> :
           <Container>
                   <Row>
                      <Col md={{span :10, offset :1}}>
                        <div className="d-flex justify-content-center flex-wrap">
                        {productsSearch?.map((product)=> (
                          <ProductPreview {...product}/>
                        ))}
                        </div>
                      </Col>
                   </Row>
            </Container>
            } 
    </div>
  )
}

export default CategoryPage