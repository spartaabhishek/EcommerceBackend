var {User}=require('../models/user')
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
    }= req.body;
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