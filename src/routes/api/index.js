const express= require('express')
const router=express.Router()
const categoryRouter=require('./CategoryRouter')
const softwareGateRouter=require('./SoftwareGateRouter')
const userRouter=require('./UserRouter')

router.use('/category', categoryRouter)
router.use('/software-gate', softwareGateRouter)
router.use('/user',userRouter)

module.exports=router