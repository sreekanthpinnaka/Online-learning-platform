const MongoClient  = require("mongodb").MongoClient;

class connection{
    static async open(){
        if(this.db) return this.db;
        this.db=await MongoClient.connect(this.uri,{useUnifiedTopology:true});
        return this.db;
    }
}
connection.db=null;
connection.uri = "mongodb+srv://Sumanthsk:Sumanth@8197@cluster0.gq2sl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//"mongodb+srv://User_sree:hsrpqwert1@cluster0.zodxr.mongodb.net/retryWrites=true&w=majority";

module.exports ={ connection}
