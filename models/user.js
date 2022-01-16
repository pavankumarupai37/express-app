const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    phone_no:{type:String,required:true,unique:true,maxLength:10},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true}
});

module.exports=mongoose.model('User',userSchema);