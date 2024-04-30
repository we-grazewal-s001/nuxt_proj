import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    "firstName":{type:String,required:true},
    "lastName":{type:String,required: true},
    "userName":{type:String,required:true, unique:true},
    "middleName":{type:String},
    "email":{type:String, required:true, unique: true},
    "displayName":{type:String,required:true},
    "title":{type:String,required:true},
    "image":{type:String},
    "country":{type:String,required:true},
    "gender":{type:String,required:true,enum: ['Male', 'Female', 'Other']}
})
 const User= mongoose.model('user',userSchema)
export default User
