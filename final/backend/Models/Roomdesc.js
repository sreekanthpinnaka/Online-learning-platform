const mongoose =require('mongoose')
const Schema= mongoose.Schema

var Roomdesc = new Schema(
    {
        userMail: { type: String },
        descr: { type: String },
        teacherName: { type: String }
}
);
module.exports=mongoose.model('Roomdesc',Roomdesc)
