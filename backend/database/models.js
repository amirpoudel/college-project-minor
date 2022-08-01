const mongoose = require("mongoose");
const schema = require('./schema');


//model for admin
const adminModel = new mongoose.model('admin',schema.adminSchema);

//model for user

const userModel = new mongoose.model('user',schema.userSchema);

//model for candidate

const candidateModel = new mongoose.model('candidate',schema.candidateSchema);

//model for vote

const voteModel = new mongoose.model('vote',schema.voteSchema);

module.exports={
    adminModel :adminModel,
    userModel  :userModel,
    candidateModel : candidateModel,
    voteModel  : voteModel,
}