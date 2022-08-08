import dotenv from 'dotenv'
dotenv.config()
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET)
import express from 'express'
import cors from 'cors'
import connectDB  from './config/db.js'
const PORT = process.env.PORT || 8000
import userRoute from './routes/user.js'
import productRoute from './routes/product.js'
import imageRoute from './routes/cloud.js'
import orderRoute from './routes/order.js'
const app = express()
import http from 'http'
import {Server} from 'socket.io'
const server  = http.createServer(app)

const io = new Server(server,{
  cors: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', "DELETE"] 
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:  true}))


// connectDB()

app.use('/api/user', userRoute)

app.use('/api/product', productRoute)

app.use('/api/images', imageRoute)

app.use('/api/orders', orderRoute)

connectDB()

app.post('/create-payment', async (req,res) =>{
  const {amount}  = req.body
    try {
       const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'inr',
        payment_method_types: ['card']
        })

        res.status(200).json(paymentIntent)
    } catch (e) {
        console.log(e.message);
        res.status(400).json(e.message);
    }
})

app.get('/', (req,res)=>{
    res.send('Success..')
})

server.listen(PORT, ()=>{
    console.log(`Server started at port http://localhost:${PORT}`)
})


app.set('socketio', io);