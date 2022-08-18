
const database = require("../database/database");

const bcrypt = require('bcrypt');

require("dotenv").config();

const jwt = require('jsonwebtoken');

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

            //when login successfull create jwt token

            
            const token = jwt.sign({id:existingAdmin._id},process.env.TOKEN_PRIVATE_KEY,{expiresIn:"30s"})


            //store token in httpOnly cookies
            res.cookie(String(existingAdmin._id),token,{
                path:"/",
                expires:new Date(Date.now()+1000*30),
                httpOnly:true,
                sameSite:'lax'
            })


            return res.status(200).json({message:"Login Success",token});
        }else{
            return res.status(400).json({message:'Invalid Email or Password'})
        }
    })

    
   
}


const verifyToken = (req,res,next)=>{
    const cookies = req.headers.cookie;//cookie from front end;
    let token;//extract token from cookies;
    //check type of token is string or not
    if(typeof cookies ==='string'){
        token = cookies.split("=")[1];
    }
    
    if(!token){
        res.status(400).json({message:"No Token found"})
    }

    jwt.verify(String(token),process.env.TOKEN_PRIVATE_KEY,(err,decode)=>{
        if(err){
            return res.status(400).json({message:"Invalid Token"})
        }

        req.id = decode.id;
        console.log(token)
        console.log(res.id);// test
        next();

    })
}



const getAdmin = async (req,res)=>{
    const adminID = req.id;
    console.log(adminID);
    let admin;
    try{
        admin = await database.findOneAdminById(adminID);
        console.log(admin);
    } catch(error){
        return new Error(error);
    }

    if(!admin){
         return res.status(404).json({message:"User Not Found"})
    }
    return res.status(200).json({admin});
}








module.exports = {
    adminLogin:adminLogin,
    adminRegistration:adminRegistration,
    getAdmin:getAdmin,
    verifyToken:verifyToken,
}