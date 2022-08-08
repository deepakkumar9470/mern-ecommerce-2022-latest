import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from "../model/User.js";
import Order from "../model/Order.js";



export const userregister = async (req,res) =>{

    const {name, email, password} = req.body;

    try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)  
      const user = await User.create({name, email, password : hash});
      res.status(201).json(user);
    } catch (e) {
      if(e.code === 11000) return res.status(400).send('User already exists');
      res.status(400).send(e.message)
    }
    }


export const userlogin = async (req,res) =>{
          
    const {email, password} = req.body;
    try {
      const user = await User.findByCredentials(email, password);
      res.status(200).json(user)
    } catch (e) {
      res.status(400).send(e.message)
    }

    }

 
export const getUser =  async (req,res) =>{
    try {
        const users = await User.find({ isAdmin: false }).populate('orders');
        res.json(users);
        
    } catch (error) {
        console.log(error)
    }
}    
    

// Get user's orders 
export const getUsersOrder =  async (req,res) =>{
  const {id} = req.params
  try {
      const users = await User.findById(id).populate('orders');
      res.json(users.orders);
      
  } catch (error) {
    console.log(error)
  }
}    
  

