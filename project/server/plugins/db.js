import mongoose from "mongoose";

 const connectDb=async()=>{

    try {
        const config= useRuntimeConfig()
        await mongoose.connect(config.dbUrl)
        console.log('Database Connection established')
    }catch (err){

    }

}
export default connectDb