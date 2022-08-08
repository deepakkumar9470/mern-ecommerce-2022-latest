import dotenv from 'dotenv'
dotenv.config()
import express from "express";
const router = express.Router()
import cloudinary from 'cloudinary'


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});


// Image upload Route
// @ /api/images

router.delete('/:public_id', async (req,res) =>{
    const {public_id} = req.params
    try {
        await cloudinary.uploader.destroy(public_id)
        res.status(200).json({msg : "Image has been deleted"})
    } catch (error) {
        console.log(error)
    }

})






export default router