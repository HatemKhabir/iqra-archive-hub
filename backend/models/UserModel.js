const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    uploadedFiles:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"File"}],
        default:[]
    },

})

const user=mongoose.model("User",userSchema);
module.exports=user;