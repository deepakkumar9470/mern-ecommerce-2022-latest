import React from 'react'
import { Link } from 'react-router-dom'
import Rating from 'react-rating'

const Product = ({prod}) => {
            
        return (
                    <div className='col-md-3 m-2 card p-3 text-left'>
                        <div>
                            
                        <Link className='nav-link-prod' to={`product/${prod._id}`}>
                          <img src={prod.image} alt="prodimage" className='img-fluid prodimg' />
                            <h1 className='prodname'>{prod.name}</h1>
                              
                               <Rating
                               style={{color: 'orange'}}
                               initialRating={prod.rating}
                               fullSymbol="fa fa-star"
                              
                               readonly={true}/>
                            <p className='prodprice'>Price: Rs {prod.price}</p>
                          </Link>
                            
                            </div>
                    </div>
          )
}

export default Product