import React from 'react'
import './loaading.css'
import {Spinner} from 'react-bootstrap'

const Loading = () => {
  return (
    <div className="loading_container">
        <Spinner animation="grow"/>
    </div>
  )
}

export default Loading