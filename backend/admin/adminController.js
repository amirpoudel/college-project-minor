
const database = require("../database/database");

const bcrypt = require('bcrypt');


const saltRounds = 10;




//managge Admin Registration
const adminRegistration = async(req,res)=>{
    const data = await req.body;
    if(data.password == data.confirmPassword){
        bcrypt.hash(data.password,saltRounds,function(err,hash){//hashing the password and store in database
            database.createAdmin(data.firstName,data.middleName,data.lastName,data.email,hash);
        })
    
        console.log(data);
        res.sendStatus(200);
    }else{
        res.send(500);
    }
    
}





//manage Admin Login
const adminLogin = async(req,res)=>{
    const data = await req.body;
    let existingAdmin ;
    try {
        existingAdmin = await database.findOneAdmin(data.username);
    } catch (error) {
        return new Error(error);
    }
    if(!existingAdmin){
        return res.status(400).json({message:"Admin not found."});
    }


    bcrypt.compare(data.password,existingAdmin.password,function(err,result){
        if(result === true){
            return res.status(200).json({message:'Successfully Logged In'});
        }else{
            return res.status(400).json({message:'Invalid Email or Password'})
        }
    })





    
    
   
}








module.exports = {
    adminLogin:adminLogin,
    adminRegistration:adminRegistration,
}