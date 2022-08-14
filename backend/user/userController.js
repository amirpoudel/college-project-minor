
const database = require("../database/database");

require("dotenv").config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const saltRounds = 10;



const userLogin = async (req,res)=>{
    const data = await req.body;
   
    
    let existingUser ;
    try {
        existingUser = await database.findOneUser(data.username);
        
        
    } catch (error) {
    
        return new Error(error);
    }
    if(!existingUser){
        return res.status(400).json({message:"User not found."});
    }

    bcrypt.compare(data.password,existingUser.password,function(err,result){
        if(result === true){
            //generating token
            const token = jwt.sign({id:existingUser._id},process.env.TOKEN_PRIVATE_KEY,{
                expiresIn:"1hr",
            })
            return res.status(200).json({message:'Successfully Logged In',token});
        }else{
            
            return res.status(400).json({message:'Invalid Email or Password'})
        }
    })
    
    
}








const userRegistration =  async(req,res)=>{
    const data = await req.body;
    if(data.password == data.confirmPassword){

        bcrypt.hash(data.password,saltRounds,function(err,hash){//hashing the password and store in database
            database.createUser(data.votingID,data.firstName,data.middleName,data.lastName,data.email,hash);
        })
        
        console.log(data);
        return res.status(200).json({message:'Successfully User Registration'});
    }else{
        return res.status(400).json({message:'Password Doesnot Match'})
    }
}


module.exports={
    userLogin:userLogin,
    userRegistration:userRegistration,

}