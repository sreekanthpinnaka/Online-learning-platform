const mongoose =require('mongoose')
const Schema= mongoose.Schema

var Msg = new Schema(
    {
        
        username: {type: String},
        msg: {type: String},
     
}
);
module.exports=mongoose.model('Msg',Msg);