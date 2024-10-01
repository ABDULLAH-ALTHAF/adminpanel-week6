const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    username:{type:String,unique:true},
    email:{type:String},
    password:{type:String},
    role:{type:String,required:true}
})

const User = mongoose.model('user',userSchema) 

module.exports = User