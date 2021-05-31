const User=require('../app/models/User')
const jwt=require('jsonwebtoken')
const AuthenticationConstant = require('../constant/AuthenticationConstant')

const authMiddleWare = async (req,res,next)=>{
        const token = req.headers.token
        console.log(token.replace('Bearer ','')+"|"+AuthenticationConstant.secretKey)
        const encoded= await verifyToken(token).then(rs=>rs).catch((err)=>{return res.status(401).send(err)})     
        console.log(encoded)  
        const user = await User.findById({'_id':encoded._id, 'tokens.token':token}).then(rs=>rs).catch(err=>{return res.status(500).send()})       
        if(user){
            req.user=user
            next()
        }else res.status(401).send()
}
const verifyToken = (token) =>{
    return new Promise((resolve,reject)=>{
        try {
            const ecoded=jwt.verify(token.replace('Bearer ',''),AuthenticationConstant.secretKey)
            resolve(ecoded)
        } catch (error) {
            reject(error)
        }       
    })
}
module.exports=authMiddleWare