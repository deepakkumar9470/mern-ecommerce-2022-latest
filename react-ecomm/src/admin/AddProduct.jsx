import React,{useState} from 'react'

import {Row,Col,Form,Container,Button,Alert} from 'react-bootstrap'
import './add-product.css'
import {useAddNewProductMutation } from '../services/api'
import {Link,useNavigate} from 'react-router-dom'
import axios from '../axios'
const AddProduct = () => {
    const navigate = useNavigate()
    const [name,setName] = useState("")    
    const [price,setPrice] = useState("")   
    const [description,setDescription] = useState("")   
    const [images,setImages] = useState([])   
    const [imageToRemove,setImageToRemove] = useState(null)   
    const [category,setCategory] = useState("") 
    
    const [addNewProduct,{ error, isLoading, isError,isSuccess }] = useAddNewProductMutation()

 
    const showWidget =() =>{
      const widget = window.cloudinary.createUploadWidget({ 
        cloudName: "deepak-cloud", 
        uploadPreset: "xtb3ddyi" }, 
        (error, result) => { 
          if(!error && result.event === "success"){
            setImages((prev) => 
                [...prev, 
                  {url : result.info.url,
                   public_id : result.info.public_id}
                ])
          }
        });
      widget.open();
    }

    const removeImage = (imgObj) =>{
      setImageToRemove(imgObj.public_id)

      axios.delete(`/images/${imgObj.public_id}`)
      .then((res)=>{
        setImageToRemove(null)
        setImages((prev)=> prev.filter((img)=> img.public_id !== imgObj.public_id))
      })
      .catch((err)=>console.log(err));
    }

    const addProductHandler = (e) =>{
       e.preventDefault()
       if(!name || !price || !description || !images || !category){
        return alert('please fill all fields..')
       }
       addNewProduct({name, price,description,images, category})
       .then((res) =>{
        if(res.length > 0){
          navigate("/")
        }
       })
    }

  return (
    <Container className="p-4 mt-5">
      <Row>
        <Col md={6} className="add_form">
          
           <Form onSubmit={addProductHandler}>
             <h2>Create new Product</h2>
             
             {isSuccess && <Alert variant="success">Product added successfully</Alert>}
             {isError && <Alert variant="danger">{error.data}</Alert>}

           <Form.Group className="mb-2"  controlId="formBasicEmail">
            <Form.Label>Product name</Form.Label>
            <Form.Control 
                className="input" 
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                placeholder="Enter product name" />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Product description</Form.Label>
            <Form.Control 
                className="input" 
                as="textarea"
                value={description}
                onChange={(e)=>setDescription(e.target.value)} 
                placeholder="Enter product description" />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Product Price</Form.Label>
            <Form.Control 
                className="input" 
                type="number"
                value={price}
                onChange={(e)=>setPrice(e.target.value)} 
                placeholder="Enter product price" />
          </Form.Group>

          <Form.Group onChange={(e)=> setCategory(e.target.value)} className="mb-2" controlId="formBasicEmail">
          <Form.Label>Product Category</Form.Label>
          <Form.Select aria-label="Default select example">
              <option disabled selected>-- Select Category --</option>
              <option value="technology">Technology</option>
              <option value="wear">Styles</option>
              <option value="tablets">Tablets</option>
              <option value="phones">Phones</option>
          </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicEmail">
          <div className="image_preview_container">
                   {images.map((image)=> (
                    <div className="image_preview">
                      <img src={image.url} alt="previmg" />
                      {imageToRemove !== image.public_id  
                      && <i className="icon fa-solid fa-xmark" onClick={()=>removeImage(image)}></i>}
                    </div>
                   ))}
               </div>
            <Button variant="primary" className="mb-2 mt-2" onClick={showWidget}>Upload Image</Button>
          </Form.Group>
            
          <Form.Group>
              
            <Button type="submit" 
                    disabled={isLoading || isSuccess }
                   variant="primary" className="add_btn">Add</Button>

              
          </Form.Group>
            <p className="para">Don't have account create account 
            <Link className="para_link" to="/signup">SignUp</Link></p>
           </Form>
        </Col>

        <Col md={5} className="new_prodcut_conatiner"></Col>
      </Row>
    </Container>
  )
}

export default AddProduct