const mongoose =require('mongoose')
const Schema= mongoose.Schema

var join1 = new Schema(
    {
    name: {type: String},
    userMail: { type: String },
}
);
module.exports=mongoose.model('join1',join1);