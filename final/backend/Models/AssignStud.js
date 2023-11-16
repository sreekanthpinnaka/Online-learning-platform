const mongoose =require('mongoose')
const Schema= mongoose.Schema

var AssignStud = new Schema(
    {
        tempq: { type: String }, 
        username: {type: String},
        studentInput: { type: String }, 
        
}
);
module.exports=mongoose.model('AssignStud',AssignStud);