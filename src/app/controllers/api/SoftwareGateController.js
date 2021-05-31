const SoftwareGate=require('../../models/SoftwareGate')
const Category= require('../../models/Category')
const { ObjectID } = require('bson')

class SoftwareGateController{
    async create (req,res){
         const softwareGate= new SoftwareGate(req.body.softwareGate)
         softwareGate.createDate=Date.now()
         softwareGate.status=true
         await softwareGate.save()
         .then(async (rs)=>{
             const category = await Category.findByIdAndUpdate(softwareGate.category,
                { $push: {"softwareGate": softwareGate._id}},
                { new : true, useFindAndModify: false}                
             ).then((rs)=>{console.log(softwareGate._id)})
             .catch((err)=> {res.status(500).send()})
             res.json(rs)
             res.status(200)
         })
         .catch((err)=>{res.status(500).send()})
     }

    async findAll (req,res){
         await SoftwareGate.find({status:true})
         .populate("category")
         .then((rs)=>{res.json(rs)})
         .catch((err)=>{res.status(500).send()})
     }

    async findByCateId (req,res){
         await SoftwareGate.find({
             category : req.params.cate_id,
             status : true
         })
         .populate("category")
         .then((rs)=>{res.json(rs)})
         .catch((err)=>{res.status(500)})
     }

     async findByCateIdAndName (req,res){
        await SoftwareGate.find({
            category: req.params.cate_id,
            name: req.params.name,
            status:true
        })
        .populate("category")
        .then((rs)=>{res.json(rs)})
        .catch((err)=>{res.status(500)})
     }

     async findByName (req,res){
        await SoftwareGate.find({
            name: req.params.name,
            status:true
        })
        .populate("category")
        .then((rs)=>{res.json(rs)})
        .catch((err)=>{res.status(500)})
     }

     async findById (req,res){
        await SoftwareGate.find({
            _id: req.params._id,
            status:true
        })
        .populate("category")
        .then((rs)=>{res.json(rs)})
        .catch((err)=>{res.status(500)})
     } 
}

module.exports=new SoftwareGateController()