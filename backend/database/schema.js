const mongoose = require("mongoose");

const {Schema}= mongoose;

//schema for admin 
const adminSchema = new Schema({
    firstName  :{
        type:String,
        required:true
    },
    middleName :String,
    lastName   :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

//schema for user

const userSchema = new Schema({
    voterID:{
        type:Number,
        required:true,
    },
    firstName  :{
        type:String,
        required:true
    },
    middleName :String,
    lastName   :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVoted:{
        type:Boolean,
        required:true
    }

})


//schema for candidate

const candidateSchema = new Schema({
    candidateID:{
        type:Number,
        required:true
    },
    firstName  :{
        type:String,
        required:true
    },
    middleName :String,
    lastName   :{
        type:String,
        required:true
    },
    post :{
        type:String,
        required:true,
    },
    totalVote:Number,
    electionStatus:Boolean
    
})

//schema for vote

const voteSchema = new Schema({
    candidateID : Number,
    vote        : Number,
})

module.exports={
    adminSchema : adminSchema,
    userSchema  : userSchema,
    candidateSchema : candidateSchema,
    voteSchema  : voteSchema
    
}