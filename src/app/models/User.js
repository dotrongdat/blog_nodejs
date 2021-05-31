const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const AuthenticationConstant = require('../../constant/AuthenticationConstant')
//const validator=require('validator')

const userSchema= new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type: String
    },
    name:{
        type:String
    },
    favoriteSoftwareGate:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SoftwareGate"
    }],
    status:{
        type:Boolean
    },
    tokens:[{
        token:{
            type:String
        }
    }]
})
userSchema.statics.expireJWT = async (token)=>{
    const userDecode=jwt.verify(token,AuthenticationConstant.secretKey)
    const user=findCredential(userDecode.email,userDecode,password)
    user.tokens = user.tokens.filter(token)
    user.save().then((rs)=> rs).catch((err)=>{throw err})
}
userSchema.methods.generateJWT = async function (){
    const user = this
    const  token = jwt.sign({"_id":user._id.toString()},AuthenticationConstant.secretKey,{expiresIn:AuthenticationConstant.expiresIn})
    user.tokens=user.tokens.concat({token})
    await user.save().catch((err)=>{throw err})
    return token
    // await User.findByIdAndUpdate(user._id,
    //     {$push:{tokens: {token}}},
    //     {new:true, useFindAndModify:false}
    // ).then((rs)=>{console.log(rs)})
    // .catch((err)=>{throw err})
    // return token
}
// userSchema.methods.verifyToken = async (token)=>{
//     token=token.replace('Bearer ','')
//     const verifyToken = jwt.verify(token,secret)
//     if(verifyToken) 
// }
userSchema.statics.findCredential= async function (email, password){
    console.log(password)
    password=await bcrypt.hash(password,8)
    console.log(password)
    return await User.findOne({"email":email, "password": password})
                     .then((rs)=>{return rs})
                     .catch((err)=>{throw err})
}
userSchema.pre('save', async function (next){
    const user=this
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8)
        console.log("Hash password"+user.password)
    }
    next()
})
const User=mongoose.model('User',userSchema)
module.exports=User

