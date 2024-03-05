const mongoose=require('mongoose')

const OrgSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,

})

const Organization=mongoose.model('Org',OrgSchema)
module.exports=Organization;