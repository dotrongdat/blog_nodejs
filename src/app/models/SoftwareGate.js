const mongoose = require('mongoose')

const Schema = mongoose.Schema

const softwareGateSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    shortname: {
        type: String,
        require: true
    },
    thumbnail: {
        type: String,
        default: ''
    },
    information: {
        type: String,
        default: ''
    },
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    link: {
        type: String,
    },
    guideline: {
        type: String
    },
    createDate: {
        type: Date
    },
    status: {
        type: Boolean,
        default: true
    }
})

const SoftwareGate = mongoose.model('SoftwareGate', softwareGateSchema)
module.exports = SoftwareGate