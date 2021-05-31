const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
      name:{
        type:String,
        default: ''
      },
      description:{
        type:String,
        default: ''
      },
      softwareGate:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "SoftwareGate"
      }],
      createDate: {
          type: Date
      },
      status:{
        type:Boolean,
        default: true
      }
})

const Category=mongoose.model('Category',categorySchema)
module.exports=Category