const mongoose =require('mongoose')
const Schema= mongoose.Schema

var TestResult = new Schema(
    {
        userName: {type: String},
        testName: { type: String }, 
        marks: { type: String }, 
        
}
);
module.exports=mongoose.model('TestResult',TestResult);