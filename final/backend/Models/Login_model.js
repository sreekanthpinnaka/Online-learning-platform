const mongoose =require('mongoose')
const Schema= mongoose.Schema

var Login= new Schema(
    {
   email_id: { type: String },
   password: { type: String },
   fullName: { type: String },
  isTeacher: { type: Boolean }
}
);


module.exports=mongoose.model('login',Login)

