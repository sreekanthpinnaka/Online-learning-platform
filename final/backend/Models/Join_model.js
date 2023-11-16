const mongoose =require('mongoose')
const Schema= mongoose.Schema

var joinR = new Schema(
    {
    name: {type: String},
    username: { type: String },
    userMail: { type: String }   
}
);
module.exports=mongoose.model('joinR',joinR);