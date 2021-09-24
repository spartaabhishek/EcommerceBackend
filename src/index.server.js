const express=require("express");
const env=require('dotenv')
const mongoose = require('mongoose')
const app=express();
const userRoutes=require('./routes/user')
//environment variable 
env.config();
//mongodb connection
//mongodb+srv://abhishek:<password>@cluster0.grgsb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.grgsb.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
   
).then(()=>{
    console.log('database created')
})
app.use(express.json())

app.use('/api',userRoutes)

app.listen(process.env.PORT,()=>{
console.log(`server is running on ${process.env.PORT}`)
})