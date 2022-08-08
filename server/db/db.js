import mongoose from "mongoose";



const connectDB = async () =>{
     try {
         
        await mongoose.connect(process.env.MONGO_URL, {})
        //const dbconnect = mongoose.connection

        console.log('voooc')

        // dbconnect.on('connected', ()=>{
        //     console.log('Mongodb Connected Successfully..')
        // })
        // dbconnect.on('error', ()=>{
        //     console.log('Error to connect..')
        // })
         
     } catch (error) {
         console.log(error)
     }
}

export default connectDB