var {User}=require('../models/user')
const jwt =require('jsonwebtoken')
exports.signup=(req,res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(user) return res.status(400).json({
            message:'User already registered'
    })
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;
    const _user=new User({ firstName,
        lastName,
        email,
        password,
        userName:Math.random().toString() 
    })
    console.log("..saving")
    _user.save(function(error,data){
        console.log(error)
        console.log(data)
        if(error){
        return res.status(400).json({
            message:'someting went wrong'
        })}
        if(data){
            return res.status(201).json({
                user:data
            })
        }
    })
})
}

exports.signin=(req,res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(error) return res.status(400).json({error});
        if(user){
            if(user.authenticate(req.body.password)){
                 const token=jwt.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
                 const {_id,firstName,lastName,email,role,fullName}=user
                 res.status(200).json({
                     token,
                     user:{
                         _id,firstName,lastName,email,role,fullName
                     }
                 })
                }
                else{
                    return res.status(400).json({
                        message:"invalid password"
                    })
                }
        }
        else{
            return res.status(400).json({message:"something went wrong"});
        }
    })
}
exports.requireSignin=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1];
    const user=jwt.verify(token,process.env.JWT_SECRET)
    req.user=user;
    next()
    console.log(token)
}