import jwt from "jsonwebtoken";
import UserModel from "../model/User.js";




const checkUserAuth = async (req,res,next) =>{
              
        let token;
        const {authorization} = req.headers
        if(authorization && authorization.startsWith('Bearer')){

            try {
                // Get the token from header
                token = authorization.split(' ')[1]

                // Verify token
                const { userId } =   jwt.verify(token, process.env.JWT_SECRET)

                
                // Get the user from token
                req.user = await UserModel.findById(userId).select('-password')

                next()

            } catch (error) {
                console.log(error)
                res.status(401).send({"status" : "failed", "message" : "Unauthorized User"})
            }
        }

        if(!token){
            res.status(401).send({"status" : "failed", "message" : "Unauthorized User, No Token"})
        }       

}

export default checkUserAuth



export const isAdminAuth = ( req, res, next ) => {

    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized as an Admin')
    }

}