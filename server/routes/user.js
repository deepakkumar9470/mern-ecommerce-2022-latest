import express from "express";
const router = express.Router()

import {userregister,userlogin, getUser} from '../controllers/userController.js'

import checkUserAuth from '../middleware/auth-middleware.js'


// Protected Routes
router.use('/changepassword', checkUserAuth)


// Register Route
// @ /api/user/register

router.post('/register', userregister)


// Login Route
// @ /api/user/login
router.post('/login', userlogin)



// Get user
// @ /api/user
router.get('/', getUser)




export default router