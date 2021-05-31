const Category=require('../../models/Category')

class CategoryController{
      async create (req,res){
         const category= new Category(req.body.category)
         category.createDate=Date.now()
         category.status=true
         await category.save()
         .then((rs)=>{res.status(200).send()})
         .catch((err)=>{res.status(500).send()})

     }
     async findAll (req,res){
        const result= await Category.find({status:true}).populate("softwareGate")
        .then((rs)=> {res.json(rs)})
        .catch((err) => {res.status(500).send()})
     }
     async findById (req,res){
        await Category.findById(req.params.id).populate("softwareGate")
        .then((rs)=> {res.json(rs)})
        .catch((err) => {res.status(500).send()})
     }
}

module.exports=new CategoryController()