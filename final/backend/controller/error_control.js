const { connection } = require("../controller/client")


joinError= (req,res)=>{
    const body=req.body;
    run().catch(console.dir);
    console.log(body)
async function run(){
try{
    const client=await connection.open();
    var result=await client.db('Email_IDS').collection('Rooms').findOne(body);
    console.log(result);
}finally{
    if(result){
        return res.status(200).json({success:true})
        
    }
   return res.status(400).json({success:false});
}
}

}

createError= (req,res)=>{
    const body=req.body;
    run().catch(console.dir);
    console.log(body)
async function run(){
try{
    const client=await connection.open();
    var result=await client.db('Email_IDS').collection('Rooms').findOne(body);
    console.log(result);
}finally{
    if(result){
        return res.status(400).json({success:false})
        
    }
   return res.status(200).json({success:true});
}
}

}

module.exports={
    joinError,
    createError,
}