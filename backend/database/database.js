const mongoose = require("mongoose");
const models = require("./models");
require("dotenv").config();


const password = process.env.DB_PASSWORD;
const user = process.env.DB_USERNAME;
const url  = `mongodb+srv://${user}:${password}@cluster0.azv1xi6.mongodb.net/?retryWrites=true&w=majority`;


function connectDatabase(){
    
    mongoose.connect(url).then(()=>{
        console.log("Connection successful");
    }).catch((err)=>{
        console.log(err);
    });
}

// testing code for create admin 
function createAdmin(){
    const admin =  new models.adminModel({
        firstName:"Amir",
        middleName:" ",
        lastName:"Poudel",
        email:"amirpoudel2058@gmail.com",
        password:"helloworld"
    })
    admin.save();
}

//testing code for create user
function createUser(){
    const user = new models.userModel({
        voterID:2020116280,
        firstName:"Amir",
        middleName:" ",
        lastName:"Poudel",
        email:"amirpoudel2058@gmail.com",
        password:"helloworld"
    })
    user.save();
}

//testing code for create candidate
function createCandidate(){
    const candidate = new models.candidateModel({
        candidateID:541018,
        firstName  :"Kp",
        middleName :"",
        lastName   :"Oli",
        post       :"PM",
        electionStatus : false,
    })

    candidate.save();
}

//testing code for create vote

function  createVote(){
    const vote = new models.voteModel({
        candidateID:541018,
        vote:1
    })
    vote.save();
}




module.exports={
    connectDatabase:connectDatabase,
    createAdmin:createAdmin,
    createUser:createUser,
    createCandidate:createCandidate,
    createVote:createVote
}
