const express = require("express")
const database = require("./database/database")

const adminController = require("./admin/adminController")
const userController = require("./user/userController")

const router = express.Router();


// Routing
router.get("/",(req,res)=>{
    res.send("Hello world");
}) 



// //manage Admin Login

router.post("/adminLogin",adminController.adminLogin);

//managge Admin Registration
router.post("/adminRegistration",adminController.adminRegistration)



//manage user Login
router.post("/userLogin",userController.userLogin)

//Manage User Registration
router.post("/userRegistration",userController.userRegistration)

//manage Candidate Registration
router.post("/candidateRegistration",async(req,res)=>{
    const data = await req.body;

    database.createCandidate(data.candidateID,data.firstName,data.middleName,data.lastName,data.post);
    console.log(data);
    console.log(data.candidateID);
})









module.exports = router;