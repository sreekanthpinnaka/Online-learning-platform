const Login = require("../Models/Login_model");
const Rooms = require("../Models/room_model");
const joinR = require("../Models/Join_model");
const join1 = require("../Models/join1_model");
const Roomdesc = require("../Models/Roomdesc");



const { connection } = require("../controller/client");
const uri =
  "mongodb+srv://User_sree:hsrpqwert1@cluster0.zodxr.mongodb.net/retryWrites=true&w=majority";
const uri1 =
  "mongodb+srv://User_sree1:hsrpqwert1@cluster0.zodxr.mongodb.net/retryWrites=true&w=majority";

SignUp = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Email id or password not available",
    });
  }
  const sign = new Login(body);
  console.log(sign);
  if (!sign) {
    return res.scotatus(400).json({ success: false, err });
  }

  const doc = sign;

  run().catch(console.dir);

  async function run() {
    try {
      const client = await connection.open();

      const database = client.db("Email_IDS");
      const collection = database.collection("Login");
      const result = await collection.insertOne(doc);
      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
      );
    } finally {
      return res.status(200).json({ success: true });
    }
  }
};
createRooms = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Email id or password not available logout and login",
    });
  }

  const doc = new Rooms(body);
  console.log(doc);
  run().catch(console.dir);

  async function run() {
    try {
      var client = await connection.open();
      const result = await client
        .db("Email_IDS")
        .collection(String(body.userMail))
        .insertOne(doc);
      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
      );
      var client = await connection.open();
      const result1 = await client
        .db("Email_IDS")
        .collection("Rooms")
        .insertOne(doc);
      console.log(
        `${result1.insertedCount} documents were inserted with the _id: ${result1.insertedId}`
      );
    } finally {
      return res.status(200).json({ success: true });
    }
  }
};






joinRoom = (req, res) => {
  const body = req.body;
  run().catch(console.dir);
  console.log(body.name);
  console.log(body.username);
  console.log(body.userMail);
  const doc = new joinR(body);
  console.log(doc);

  async function run() {
    try {
      const client = await connection.open();

      const result = await client
        .db(String(body.name))
        .collection("mates")
        .insertOne(doc);
      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
      );
    } finally {
      if (1) {
        return res.status(200).json({ success: true });
      }
    }
  }
};

joinRoom1 = (req, res) => {
  const body = req.body;
  run().catch(console.dir);
  const document = new join1(body);

  async function run() {
    try {
      const client = await connection.open();
      var result = await client
        .db("Email_IDS")
        .collection(String(body.userMail))
        .insertOne(document);
      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
      );
    } finally {
      if (result) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ success: false });
      }
    }
  }
};

getRooms = (req, res) => {
  const body = req.body;
  console.log(body.userMail);
  run().catch(console.dir);
  async function run() {
    try {
      const client = await connection.open();
      var result = await client
        .db("Email_IDS")
        .collection(String(body.userMail))
        .find({})
        .toArray(function (err, docs) {
          console.log(docs);
          return res.status(200).json({ success: true, results: docs });
        });

      console.log(result);
    } finally {
    }
  }
};

deleteRoom = (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Email id or password not available",
    });
  }

  run().catch(console.dir);
  //const query = { name: body };
  var result;
  async function run() {
    try {
      const database = client.db("Email_IDS");
      const collection = database.collection("Rooms");
      result = await collection.deleteOne(body, function (err, obj) {
        if (err) {
          console.log("No documents matched the query. Deleted 0 documents.");
          //throw err;
          return res
            .status(400)
            .json({ success: false, error: "Could not delete" });
        }

        //console.log("1 document deleted");
        console.dir("Successfully deleted one document.");
        return res.status(200).json({ success: true, result: result });
        /*if (result) {
            
    
          } else {
            
          }*/
      });
      console.log("res is " + result);

      //console.log(result);
    } finally {
      console.log("fginally");
    }
  }
};

LoginID = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Email id or password not available",
    });
  }

  run().catch(console.dir);
  console.log(body);
  async function run() {
    try {
      const client = await connection.open();

      const database1 = client.db("Email_IDS");
      const collection = database1.collection("Login");
      var result = await collection.findOne(body);
      console.log(result);
    } finally {
      if (result) {
        return res.status(200).json({ success: true, result: result });
      } else {
        return res
          .status(400)
          .json({ success: false, error: "Email or password is incorrect" });
      }
    }
  }
};

userId = (req, res) => {
  const body1 = req.body;
  if (!body1) {
    return res.status(400);
  }

  console.log(body1.email_id);
  run().catch(console.dir);

  console.log(typeof body1);
  console.log(body1.email_id);

  async function run() {
    try {
      const client = await connection.open();
      const database = client.db("Email_IDS");
      database.createCollection(String(body1.email_id), function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
      });
    } finally {
      if (1) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ success: false });
      }
    }
  }
};




createdRoomdesc = (req, res) => {
  const body = req.body;
  run().catch(console.dir);
  console.log(body.name);
  console.log(body.descr)

  const doc = new Roomdesc(body);
  console.log(doc)

  async function run() {
    try {
      const client = await connection.open();

      const result = await client
        .db(String(body.name))
        .collection("desc")
        .insertOne(doc);
        console.log(
        `desc inserted`
      );
    } finally {
      if (1) {
        return res.status(200).json({ success: true });
      }
    }
  }
};

getdesc = (req, res) => {
  const body = req.body;
  run().catch(console.dir);
  console.log(body.name);

  async function run() {
    try {
      const client = await connection.open();
      var result = await client
        .db(String(body.name))
        .collection("desc")
        .find({})
        .toArray(function (err, docs) {
          console.log(docs);
          return res.status(200).json({ success: true, results: docs });
        });

      // console.log(result);
    } finally {
    }
  }
};






module.exports = {
  SignUp,
  joinRoom1,
  LoginID,
  createRooms,
  createdRoomdesc,getdesc,
  getRooms,
  deleteRoom,
  userId,
  joinRoom,
};
