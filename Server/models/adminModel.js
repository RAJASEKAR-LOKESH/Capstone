const mongoose=require("mongoose")

const adminSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String,required:true,lowecase:true,trim:true},
    password:{type:String,required:true},
    role:{type:String,default:'admin'}
})

const Admin=mongoose.model("Admin",adminSchema)
module.exports=Admin