const mongoose =require('mongoose')
const Schema= mongoose.Schema

var Assign = new Schema(
    {
        assignment: {type: String},
        id: { type: String }, 
}
);
module.exports=mongoose.model('Assign',Assign);