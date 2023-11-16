const mongoose =require('mongoose')
const Schema= mongoose.Schema

var Notes = new Schema(
    {
    note: {type: String},
     
}
);
module.exports=mongoose.model('Notes',Notes);