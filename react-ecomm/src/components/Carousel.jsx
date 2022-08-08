import React from 'react'

const Carousel = () => {
  return (
    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="10000">
        <img src="https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="..."/>
        </div>
        <div className="carousel-item" data-bs-interval="2000">
        <img src="https://images.pexels.com/photos/5591912/pexels-photo-5591912.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="..."/>
        </div>
        <div className="carousel-item">
        <img src="https://images.pexels.com/photos/9594952/pexels-photo-9594952.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="..."/>
        </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
</div>
  )
}

export default Carousel