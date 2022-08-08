import mongoose from 'mongoose'


const connectDB = async () =>{

    try {
         const DB_OPTIONS = {
             dbName : "mern-auth"
         }
        await mongoose.connect(process.env.MONGO_URL, DB_OPTIONS)
        console.log('MongoDB Connected..')
    } catch (error) {
        console.log(error)
    }
}


export default connectDB