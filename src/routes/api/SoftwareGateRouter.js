const express= require('express')
const router=express.Router()
const SoftwareGateController=require('../../app/controllers/api/SoftwareGateController')
const authMiddleWare = require('../../middlewares/auth')

router.get('/category/:cate_id/name/:name',authMiddleWare,SoftwareGateController.findByCateIdAndName)
router.get('/category/:cate_id',authMiddleWare,SoftwareGateController.findByCateId)
router.get('/:name',authMiddleWare,SoftwareGateController.findByName)
router.get('/_id/:_id',authMiddleWare,SoftwareGateController.findById)
router.post('',authMiddleWare,SoftwareGateController.create)
router.get('',authMiddleWare,SoftwareGateController.findAll)

module.exports=router