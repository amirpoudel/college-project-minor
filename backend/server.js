const database = require('./database/database');
const bodyParser = require('body-parser');
const express = require('express');
const { response } = require('express');
const app = express();
app.use(bodyParser.json());
const axios = require('axios').default;

const port = 5000;


database.connectDatabase();

// database.createAdmin();
// database.createUser();
 //database.createCandidate();
// let count = 0;
// while(count<5){
//     database.createVote();
//     count++;
// }
 

/// testing code for find data

// async function allVotes(){
//     const allVotes = await database.findAllVotes();
//      console.log(allVotes);
    
// }
// allVotes();

async function allCandidate(){
    const allCandidate = await database.findAllCandidates();
    console.log(allCandidate);
}
// allCandidate();

async function candidate(candidateID){
    const candidate = await database.findCandidate(candidateID);
    console.log(candidate);
}
candidate(541018);

async function allUsers(){
    const users = await database.findUsers();
    console.log(users);
}
allUsers();

//Update candidate votes
database.updateCandidateVotes();


// Routing
app.get("/",(req,res)=>{
    res.send("Hello world");
})


app.post("/userLogin",async (req,res)=>{
    const data = await req.body;
    console.log(data);
    
    res.sendStatus(200);
})

app.post("/adminRegistration",async(req,res)=>{
    const data = await req.body;
    
    if(data.password == data.confirmPassword){
        database.createAdmin(data.firstName,data.middleName,data.lastName,data.email,data.password);
        console.log(data);
        res.sendStatus(200);
    }else{
        res.send(500);
    }
    
})




app.listen(port,()=>{
    console.log(`listen at ${port}`);
})






