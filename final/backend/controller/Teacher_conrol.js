const Assign = require("../Models/Assignment_model");
const Notes = require("../Models/Notes_model");
const Tests = require("../Models/Tests");
const Msg = require("../Models/Msg");
const AssignStud = require("../Models/AssignStud");
const TestResult = require("../Models/TestResult");

//const OneTest = require("../Models/OneTest");
const { connection } = require("../controller/client");

insertAssignment = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "No Assignment",
    });
  }
  const sign = new Assign(body);
  console.log(sign);
  if (!sign) {
    return res.status(400).json({ success: false, err });
  }

  const doc = sign;
  console.log(body.name);
  run().catch(console.dir);

  async function run() {
    try {
      const client = await connection.open();

      const database = client.db(String(body.name));
      const collection = database.collection("Assignments");
      const result = await collection.insertOne(doc);
      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
      );
    } finally {
      return res.status(200).json({ success: true });
    }
  }
};

getAssignment = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Cant get db Assignment",
    });
  }
  /*const sign = new Assign(body);
  console.log(sign);
  if (!sign) {
    return res.status(400).json({ success: false, err });
  }

  const doc = sign;
  */ console.log(
    body.name
  );
  run().catch(console.dir);

  async function run() {
    try {
      const client = await connection.open();

      const database = client.db(String(body.name));
      const collection = database
        .collection("Assignments")
        .find({})
        .toArray(function (err, docs) {
          if (err) {
            return res.status(400).json({ success: false });
          }
          return res.status(200).json({ success: true, results: docs });
        });
    } finally {
    }
  }
};

insertNotes = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ success: false });
  }

  const doc = new Notes(body);
  console.log(body.note);
  console.log(body.name);
  run().catch(console.dir);

  async function run() {
    try {
      const client = await connection.open();

      var result = await client
        .db(String(body.name))
        .collection("Notes")
        .insertOne(doc);
      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
      );
    } finally {
      if (result) {
        return res.status(200).json({ success: true });
      }
      return res.status(400).json({ success: false });
    }
  }
};

getNotes = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ success: false });
  }

  //const doc = new Notes(body);
  //console.log(body.note);
  console.log(body.name);
  run().catch(console.dir);

  async function run() {
    try {
      const client = await connection.open();

      var result = await client
        .db(String(body.name))
        .collection("Notes")
        .find({})
        .toArray(function (err, docs) {
          if (err) {
            return res.status(400).json({ success: false });
          }
          return res.status(200).json({ success: true, results: docs });
        });
    } finally {
    }
  }
};

Mates = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ success: false });
  }
  console.log(body);
  run().catch(console.dir);
  async function run() {
    try {
      const client = await connection.open();
      var result = client
        .db(String(body.name))
        .collection("mates")
        .find({})
        .toArray(function (err, docs) {
          if (err) {
            return res.status(400).json({ success: false });
          }
          return res.status(200).json({ success: true, results: docs });
        });
    } finally {
    }
  }
};


insertTests = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "No Test Data Found to insert",
    });
  }
  /*let tempdataholder = [];
  body.test.qs.map((s)=>{
    const q = new OneTest(s);
    tempdataholder.push(s)
  })
  console.log("tempdataholder")
  console.log(tempdataholder)*/
  const sign = new Tests(body.test);
  console.log("sign")
  console.log(sign)

  //console.log(sign);
  if (!sign) {
    return res.status(400).json({ success: false, err });
  }

  const doc = sign;
  
  //console.log(body.name);
  //console.log(body.test);
  run().catch(console.dir);

  async function run() {
    try {
      const client = await connection.open();

      const database = client.db(String(body.name));
      const collection = database.collection("Tests");
      const result = await collection.insertOne(doc);
      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
      );
    } finally {
      return res.status(200).json({ success: true });
    }
  }
};


getTests = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "No Test Data Found to insert",
    });
  }
  /*let tempdataholder = [];
  body.test.qs.map((s)=>{
    const q = new OneTest(s);
    tempdataholder.push(s)
  })
  console.log("tempdataholder")
  console.log(tempdataholder)
  const sign = new Tests(body.test);
  console.log("sign")
  console.log(sign)

  //console.log(sign);
  if (!sign) {
    return res.status(400).json({ success: false, err });
  }

  const doc = sign;
  */
  //console.log(body.name);
  //console.log(body.test);
  run().catch(console.dir);

  async function run() {
    try {
      const client = await connection.open();

      const database = client.db(String(body.name));
      const collection = database.collection("Tests")
      .find({})
        .toArray(function (err, docs) {
          if (err) {
            return res.status(400).json({ success: false });
          }
          return res.status(200).json({ success: true, results: docs });
        });
    } finally {
    }
  }
};


insertMsg = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ success: false });
  }

  const doc = new Msg(body);
  console.log(body.msg);
  console.log(body.name);
  run().catch(console.dir);

  async function run() {
    try {
      const client = await connection.open();

      var result = await client
        .db(String(body.name))
        .collection("Msgs")
        .insertOne(doc);
      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
      );
    } finally {
      if (result) {
        return res.status(200).json({ success: true });
      }
      return res.status(400).json({ success: false });
    }
  }
};


getMsg = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ success: false });
  }
  console.log(body.name);
  run().catch(console.dir);

  async function run() {
    try {
      const client = await connection.open();

      var result = await client
        .db(String(body.name))
        .collection("Msgs")
        .find({})
        .toArray(function (err, docs) {
          if (err) {
            return res.status(400).json({ success: false });
          }
          return res.status(200).json({ success: true, results: docs });
        });
    } finally {
    }
  }
};

insertStudentAssignmentWork = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ success: false });
  }

  const doc = new AssignStud(body);
  console.log(body.msg);
  console.log(body.name);
  run().catch(console.dir);

  async function run() {
    try {
      const client = await connection.open();

      var result = await client
        .db(String(body.name))
        .collection("StudWorkAssign")
        .insertOne(doc);
      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
      );
    } finally {
      if (result) {
        return res.status(200).json({ success: true });
      }
      return res.status(400).json({ success: false });
    }
  }
};


getStudentAssignmentWork = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ success: false });
  }
  console.log(body.name);
  run().catch(console.dir);

  async function run() {
    try {
      const client = await connection.open();

      var result = await client
        .db(String(body.name))
        .collection("StudWorkAssign")
        .find({})
        .toArray(function (err, docs) {
          if (err) {
            return res.status(400).json({ success: false });
          }
          return res.status(200).json({ success: true, results: docs });
        });
    } finally {
    }
  }
};


submitTests = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ success: false });
  }

  const doc = new TestResult(body);
  console.log("Test submtitng"+body.roomName);
  console.log(body.userName);
  run().catch(console.dir);

  async function run() {
    try {
      const client = await connection.open();

      var result = await client
        .db(String(body.roomName))
        .collection("TestResults")
        .insertOne(doc);
      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
      );
    } finally {
      if (result) {
        return res.status(200).json({ success: true });
      }
      return res.status(400).json({ success: false });
    }
  }
};

getsubmitTests = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ success: false });
  }
  console.log(body.roomName);
  run().catch(console.dir);

  async function run() {
    try {
      const client = await connection.open();

      var result = await client
        .db(String(body.roomName))
        .collection("TestResults")
        .find({})
        .toArray(function (err, docs) {
          if (err) {
            return res.status(400).json({ success: false });
          }
          return res.status(200).json({ success: true, results: docs });
        });
    } finally {
    }
  }
};
module.exports = {
  insertAssignment,
  getAssignment,

  insertNotes,
  Mates,
  getNotes,

  insertTests,
  getTests,
  submitTests,
  getsubmitTests,
  
  insertMsg,
  getMsg,

  insertStudentAssignmentWork,
  getStudentAssignmentWork
};
