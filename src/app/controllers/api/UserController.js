const { json } = require('express')
const User=require('../../models/User')

class UserController{
    async checkAuthentication (req,res){
        const user = await User.findCredential(req.headers.email,req.headers.password).then(rs=>rs).catch(err=>{res.status(500).send()})
        console.log(user)
        const token = await user.generateJWT().then(rs=>rs).catch(err=>{res.status(500).send()})
        return res.json(user,token)
    }
    async logout(req,res){
        User.expireJWT(req.header.token)
    }
    async create (req,res) {
        const user= new User(req.body.user)
        user.status=true
        await user.save()
        .then(async (rs)=>{
            const token =await user.generateJWT()
            console.log("token: "+token)
            res.status(200).json({user,token})            
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).send(err)
        })
    }
}

module.exports=new UserController()