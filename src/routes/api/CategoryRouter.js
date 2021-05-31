const express= require('express')
const router=express.Router()
const CategoryController=require('../../app/controllers/api/CategoryController')
const authMiddleWare = require('../../middlewares/auth')

router.get('/:id',authMiddleWare,CategoryController.findById)
router.get('',authMiddleWare,CategoryController.findAll)
router.post('',authMiddleWare,CategoryController.create)


module.exports = router