const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{type:String},
    age:{type:Number},
    email:{type:String,required:true,lowecase:true,trim:true},
    phone_number:{type:String},
    password:{type:String,required:true},
    registered_events:[
        {
            event_id:{type:mongoose.Schema.Types.ObjectId,ref:"Events"}
        }
    ],
    role:{type:String,default:"user"}
})

const Users=mongoose.model("Users",userSchema)
module.exports=Users

