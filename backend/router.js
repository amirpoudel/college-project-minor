const express = require("express")
const database = require("./database/database")

const adminController = require("./admin/adminController")
const userController = require("./user/userController")

const router = express.Router();


// Routing
router.get("/",(req,res)=>{
    res.send("Hello world");
}) 

//----------------------------------Manage All Request Coming From Admin ----------------------------------------------

// //manage Admin Login

router.post("/adminLogin",adminController.adminLogin);

//managge Admin Registration
router.post("/adminRegistration",adminController.adminRegistration)

//manage admin after admin login

router.get('/admin',adminController.verifyToken,adminController.getAdmin);

//manage refresh toke
router.get('/refresh',adminController.refreshToken,adminController.verifyToken,adminController.getAdmin)
;
//manage LogOut

router.get('/logout',adminController.verifyToken,adminController.logout);



// get all candidate

router.get('/getCandidate',adminController.verifyToken,adminController.getCandidate);

//get all User
router.get('/getUser',adminController.verifyToken,adminController.getUsers);


//manage Candidate Registration
router.post("/candidateRegistration",adminController.verifyToken,async(req,res)=>{
    const data = await req.body;

    database.createCandidate(data.candidateID,data.firstName,data.middleName,data.lastName,data.post);
    console.log(data);
    console.log(data.candidateID);
})



// ---------------------------------Manage All Request Coming From User ---------------------------------------------------


//Manage User Registration
router.post("/userRegistration",userController.userRegistration)

//manage user Login
router.post("/userLogin",userController.userLogin)

// manage after user Login
router.get("/user",userController.verifyToken,userController.getUser);

// refresh user token
router.get("/refresh",userController.refreshToken,userController.verifyToken,userController.getUser);

// user logout
router.post("/logout",userController.verifyToken,userController.logout);

//get Candidate for user
router.get("/getCandidateForUser",userController.verifyToken,userController.getCandidateForUser);



//manage vote sumbit by user

router.post("/submitVote",userController.verifyToken,userController.submitVote);







module.exports = router;