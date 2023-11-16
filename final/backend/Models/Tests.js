const mongoose =require('mongoose')
const Schema= mongoose.Schema

var OneTest = new Schema(
    {
        questionname:{type: String},
        options:{
            a:{type: String},
            b:{type: String},
            c:{type: String},
            d:{type: String},
        },
        answer:{type: String},
     
});
var Tests = new Schema(
    {
    name: {type: String},
    nq: {type: Number},
    qs: [OneTest],
     
}
);
module.exports=mongoose.model('Tests',Tests);

/*[
        answer:{type: Number},
        options:{
            a:{type: Number},
            b:{type: Number},
            c:{type: Number},
            d:{type: Number},
        },
        questionname:{type: Number},
    ]*/