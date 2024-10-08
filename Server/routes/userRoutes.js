const Users=require('../models/userModel')
const Events=require('../models/eventModel')
const express=require('express')
const router=express.Router()
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const auth=require('../middleware/auth')

router.post('/adduser',async(req,res)=>{
    try{
        let user_valid=await Users.findOne({email:req.body.email})
        console.log(user_valid)
        if(user_valid){
            return res.send({"message":"User Already exists"})//early return
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user=new Users({
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
            phone_number:req.body.phone_number,
            password:hashedPassword
        })
        await user.save()

        const jwtData = { _id: user._id, name: user.name, role: user.role };
        const token = jwt.sign(jwtData, process.env.JWTSECRET, { expiresIn: "2h" });

        res.send(token)

    }catch(e){
        res.send("Some internal error in the Server")
    }
})

//Current User Information

router.get("/", auth, async (req, res) => {
    const profile = await Users.findById(req.user._id);
    res.send(profile);
  });


  //all users

  router.get("/all", auth, async (req, res) => {
    const allusers = await Users.find({role:{$ne:"admin"}});
    res.send(allusers);
  });

  router.put("/updateProfile", auth, async (req, res) => {
    const profile = await Users.findById(req.user._id);
    const {name,email,phone_number,age}=req.body
    profile.name=name,
    profile.email=email,
    profile.phone_number=phone_number,
    profile.age=age
    profile.save();
    res.send(profile);
  });

  router.get("/bookedEvents", auth, async (req, res) => {
    try {
      // Fetch the user's profile
      const profile = await Users.findById(req.user._id);
  
      if (!profile) {
        return res.status(404).send({ message: "User not found" });
      }
  
      // Extract event IDs from registered_events
      const eventIds = profile.registered_events.map(event => event.event_id);
  
      // Find the event details from the Events collection
      const bookedEvents = await Events.find({ _id: { $in: eventIds } });
  
      res.send( bookedEvents );
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }
  });
  


module.exports=router