const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true,   
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    hash_password:{
        type:String,
        required:false,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    contactNumber:{
        type:String,
    },
    profilePicture:{
        type:String
    }

},{timestamp:true})

userSchema.virtual('password').set(function(pass){
    this.hash_password=bcrypt.hashSync(pass,10)
    
})
// userSchema.method={
//     authenticate: function(){
//         return bcrypt.compareSync(password,this.hash_password)
//     }
// }
const User=mongoose.model('users',userSchema)
exports.User=User;