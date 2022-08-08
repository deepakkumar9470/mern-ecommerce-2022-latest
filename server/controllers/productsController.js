
import Product from '../model/Products.js'
import User from '../model/User.js'



export const addProduct = async  (req,res) =>{

    try {
        const newProducts = new Product(req.body)
        const products = await newProducts.save()
        res.status(201).json({message : 'Products added', data : products})
    } catch (error) {
        console.log(error)
    }

}

export const getProducts = async  (req,res) =>{
   try {
       const products = await Product.find({})
       res.status(200).json(products)
   } catch (error) {
    console.log(error)
   }
}


export const editProduct = async (req,res) =>{
    const id = req.params.id
   try {
      const updateproduct = await Product.findByIdAndUpdate(id, req.body, {new : true})
      const products = await Product.find()
      res.status(200).json({message : 'Products updated success', products})

   } catch (error) {
    console.log(error)
   }
}


export const deleteProduct = async (req,res) =>{
  const {id} = req.params;
  const {userId} = req.body;
  console.log('user_id from api', userId)
  try {
    const user = await User.findById(userId);
    console.log('user from api',user)
    if(!user.isAdmin) return res.status(401).json("You don't have permission");
    await Product.findByIdAndDelete(id);
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
}


export const getProductById = async (req,res) =>{
    const {id} = req.params;
    try {
        const product = await Product.findById(id)
        const similar = await Product.find({category: product.category}).limit(5)
        res.status(200).json(product, similar)
    } catch (error) {
     console.log(error)
    }
}


export const getProductCategory = async (req,res) =>{
    const {category} = req.params
    try {
        let product;
        if(category === "all") {
          product = await Product.find().sort([['date', -1]])
        }else{
        product = await Product.find({category})
        }
     
        res.status(200).json( product)
    } catch (error) {
     console.log(error)
    }
}


export const addToCart = async (req,res) =>{
    const {userId,productId,price} = req.body
  
    try {
        const user = await User.findById(userId)
        const userCart = user.cart;
        if(user.cart[productId]){
            userCart[productId] += 1
        }else{
            userCart[productId] = 1
        }

        userCart.count += 1
        userCart.total = Number(userCart.total) + Number(price)
        user.cart = userCart
        user.markModified('cart')
        await user.save()
        res.status(200).json(user)
    } catch (error) {
     console.log(error)
    }
}



export const increaseCartCount = async (req,res) =>{
    const {userId, productId, price} = req.body;
    try {
      const user = await User.findById(userId);
      const userCart = user.cart;
      userCart.total += Number(price);
      userCart.count += 1;
      userCart[productId] += 1;
      user.cart = userCart;
      user.markModified('cart');
      await user.save();
      res.status(200).json(user);
    } catch (e) {
      res.status(400).send(e.message);
    }
}


export const decreaseCartCount = async (req,res) =>{
    const {userId, productId, price} = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(price);
    userCart.count -= 1;
    userCart[productId] -= 1;
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
}


export const removeProductFromCart = async (req,res) =>{
    const {userId,productId,price} = req.body
  
    try {
        const user = await User.findById(userId)
        const userCart = user.cart;
       
        userCart.total -= Number(userCart[productId]) * Number(price)
        userCart.count -= userCart[productId]
        delete userCart[productId]
        user.cart = userCart
        user.markModified('cart')
        await user.save()
        res.status(200).json(user)
    } catch (error) {
     console.log(error)
    }
}