const express=require('express')
const connection=require('./db/connection')
const eventRoutes=require('./routes/eventRoutes')
const userRoutes=require('./routes/userRoutes')
const adminRoutes=require('./routes/adminRoutes')
const authRoutes=require('./routes/auth')

const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()

const app=express();


const PORT=process.env.PORT || 5000

connection()
app.use(express.json())
app.use(cors());

app.use("/api/event",eventRoutes);
app.use("/api/user",userRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/auth",authRoutes);

app.listen(PORT,()=>{
    console.log("Server Started at",PORT)
})