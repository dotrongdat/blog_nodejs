const express=require('express')
const UserController = require('../../app/controllers/api/UserController')
const router=express.Router()

router.post('/register',UserController.create)
router.post('/login',UserController.checkAuthentication)
router.post('/logout',UserController.logout)

module.exports=router
