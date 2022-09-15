const mongoose = require("mongoose");
const models = require("./models");
require("dotenv").config();


const password = process.env.DB_PASSWORD;
const user = process.env.DB_USERNAME;
const url = `mongodb+srv://${user}:${password}@cluster0.azv1xi6.mongodb.net/?retryWrites=true&w=majority`;


function connectDatabase() {

    mongoose.connect(url).then(() => {
        console.log("Connection successful");
    }).catch((err) => {
        console.log(err);
    });
}

// -------------------------------------Inserting data-----------------------------------------------------

// testing code for create admin 
async function createAdmin(firstName,middleName,lastName,email,password) {

    try {
        const admin = new models.adminModel({
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            email: email,
            password: password
        })
        await admin.save();
    } catch (error) {
        console.log(error)
    }


}

//testing code for create user
async function createUser(voterID,firstName,middleName,lastName,email,password) {
    try {
        const user = new models.userModel({
            voterID: voterID,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            email: email,
            password: password,
            isVoted:false
        })
        await user.save();
    } catch (error) {
        console.log(error);
    }

}

//testing code for create candidate
async function createCandidate(candidateID,firstName,middleName,lastName,post) {
    try {
        const candidate = new models.candidateModel({
            candidateID: candidateID,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            post: post,
            totalVote:0,
            electionStatus: false,
        })

        await candidate.save();
    } catch (error) {
        console.log(error);
    }

}

//testing code for create vote

async function createVote(candidateID) {
    try {
        const vote = new models.voteModel({
            candidateID: candidateID,
            vote: 1
        })
        await vote.save();

        //after saving votes - update votes
        updateCandidateVotes();
    } catch (error) {
        console.log(error);
    }

}

// ------------------------------------------------------------Reading Data----------------------------------------------


async function getDocuments() {
    const result = await models.adminModel.find();
    return result;

}


//find admin by username(Email)
async function findOneAdmin(email){
    const result = await models.adminModel.findOne({email:email})
    return result;
}

//find admin by id
async function findOneAdminById(id){

    const result = await models.adminModel.findById(id,"-password");//this "-password" parameter doesnot return password from database;
    return result;
  
}


// finds all votes
async function findAllVotes() {
    const result = await models.voteModel.find();
    return result;
}

//finds all candidate 
async function findAllCandidates() {
    const result = await models.candidateModel.find();
    return result;
}

// finds all candidate except total votes
async function findAllCandidatesForUser(){
    const result = await models.candidateModel.find(null,{totalVote:0 ,electionStatus:0});
    return result;
}

//finds candidate by candidateID

async function findCandidate(candidateID) {
    const result = await models.candidateModel.find({ candidateID: candidateID });
    return result;
}

//finds all users

async function findUsers() {
    const result = await models.userModel.find();
    return result;
}

//find user by email

async function findOneUser(email){
    const result = await models.userModel.findOne({email:email});
    return result;
}

//find user by ID

async function findOneUserById(id){

    const result = await models.userModel.findById(id,"-password");//this "-password" parameter doesnot return password from database;
    return result;
  
}


//update data in models

async function update_candidate_vote(id){
        try {
            await models.candidateModel.findOneAndUpdate({candidateID:id},
                {$inc:{
                    totalVote:1
                }})
            //console.log(updateVote);
        } catch (error) {
            console.log("Error! ! ! cannot update candidate vote")
        }
}



// update candidate votes
// re-write this code - this code is shit
async function updateCandidateVotes() {
    
    //function for find all votes
    async function allVotes() {
        const result = await findAllVotes();
        return result;

    }
    //find Onecandidate
    async function oneCandidate(candidateID){
        const result = await findCandidate(candidateID);
        return result;
    }

    const totalVotes = await allVotes();
    //console.log(totalVotes)
   ;
   
    totalVotes.forEach( async function(vote){
        console.log(vote.candidateID);
        //const candidate =  oneCandidate(vote.candidate);
        //console.log(candidate.candidateID);
        
       await update_candidate_vote(vote.candidateID);
        // console.log(candidate.candidateID);
       
    })
    
}

module.exports = {
    //function for inserting data
    connectDatabase: connectDatabase,
    createAdmin: createAdmin,
    createUser: createUser,
    createCandidate: createCandidate,
    createVote: createVote,

    //function for reading data
    getDocuments: getDocuments,
    findAllVotes: findAllVotes,
    findAllCandidates: findAllCandidates,
    findCandidate: findCandidate,
    findUsers: findUsers,
    findOneUser:findOneUser,
    findOneUserById:findOneUserById,
    findOneAdmin:findOneAdmin,
    findOneAdminById:findOneAdminById,
    findAllCandidatesForUser:findAllCandidatesForUser,


    //update candidate votes
    updateCandidateVotes:updateCandidateVotes,

}
