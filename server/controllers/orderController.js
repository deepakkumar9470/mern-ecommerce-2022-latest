
import Order from '../model/Order.js'
import User from '../model/User.js'



export const placeOrder = async (req,res) =>{
   
    const {userId, cart, address, country} = req.body
    try {
        
      const user = await User.findById(userId)
      const order = await Order.create({owner : user._id, products : cart, address})
      order.count = cart.count
      order.total = cart.total
      await order.save()
      user.cart  = {count: 0, total : 0}
      user.orders.push(order);
      user.markModified('orders');
      await user.save();
      res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}


export const getAllOrders = async (req,res) =>{
   

    try {
        const orders = await Order.find().populate('owner', ['email', 'name'])
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
    }

}


