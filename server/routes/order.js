import express from "express";
const router = express.Router()

import {  getAllOrders, placeOrder } from '../controllers/orderController.js'



// @ /api/orders
router.post('/', placeOrder)

// @ /api/orders
router.get('/', getAllOrders)






export default router