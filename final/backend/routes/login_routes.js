const express =require('express')

const logcntrl= require('../controller/Login_control')
const tecntrl=require('../controller/Teacher_conrol')
const errcntrl=require('../controller/error_control')

const router=express.Router()
router.post("/userId",logcntrl.userId)
router.post("/sign",logcntrl.SignUp)
router.post("/login",logcntrl.LoginID)
router.post("/rooms",logcntrl.createRooms)
router.post("/createdRoomdesc",logcntrl.createdRoomdesc)
router.post("/getdesc",logcntrl.getdesc)

router.post("/joinRoom",logcntrl.joinRoom)
router.post("/getRooms",logcntrl.getRooms)
router.post("/deleterooms",logcntrl.deleteRoom)
router.post("/joinRoom1",logcntrl.joinRoom1)

router.post('/insertAssignment',tecntrl.insertAssignment)
router.post('/getStudentAssignmentWork',tecntrl.getStudentAssignmentWork)
router.post('/insertStudentAssignmentWork',tecntrl.insertStudentAssignmentWork)


router.post('/insertNotes',tecntrl.insertNotes);
router.post('/Mates',tecntrl.Mates);
router.post('/joinError',errcntrl.joinError);
router.post('/createError',errcntrl.createError);

router.post('/getNotes',tecntrl.getNotes);
router.post('/getAssignment',tecntrl.getAssignment);

router.post('/insertTests',tecntrl.insertTests);
router.post('/getTests',tecntrl.getTests);
router.post('/submitTests',tecntrl.submitTests);
router.post('/getsubmitTests',tecntrl.getsubmitTests);


//router.post('/submitTests',tecntrl.submitTests);


router.post('/getMsg',tecntrl.getMsg);
router.post('/insertMsg',tecntrl.insertMsg);

module.exports=router

