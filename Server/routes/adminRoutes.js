const Admin=require('../models/adminModel')
const express=require('express')
const router=express.Router()

router.post('/addadmin',async(req,res)=>{
    try{
        let admin=await Admin.findOne({email:req.body.email})
        if(admin){
            return res.send({"message":"Admin Already exists"})//early return
        }
        const adminData=new Admin({
            email:req.body.email,
            password:req.body.password
        })
        adminData.save()
        res.send(adminData)
    }catch(e){
        res.send("Some internal error")
    }
})

router.post('/admin',async(req,res)=>{
  
    let admin=await Admin.findOne({email:req.body.email})

    if(admin.password==req.body.password){
        res.send({
            message:"Admin Logged",
            admin:admin,
        })
    }
    else{
        res.send("Admin Credentials Not Matched")
    }
})

module.exports=router