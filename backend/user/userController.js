
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
                expiresIn:"1h",
            })
            //if already cookies in there so  remove first 
            if(req.cookies[`${existingUser._id}`]){
                req.cookies[`${existingUser._id}`] = "";
            }
          //after userLogin  storing token in httpOnly cookies 
            res.cookie(String(existingUser._id),token,{
                path:"/",
                expires: new Date(Date.now()+1000*6000),//30 sec expire
                httpOnly:true,
                sameSite:'lax'
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



//Verify Token

const verifyToken = (req,res,next)=>{
    //Using Cookie Came From FrontEnd which is actually generated by me 
    const cookies = req.headers.cookie;
    let token;
    if(typeof cookies ==='string'){
         token  = cookies.split("=")[1];//slipt headers from token
    }
   
    if(!token){
        res.status(400).json({message:"No Token found"})
    }

    jwt.verify(String(token),process.env.TOKEN_PRIVATE_KEY,(err,decode)=>{
        if(err){
            return res.status(400).json({message:"Invalid Token"})
        }

        req.id = decode.id;//attach decoded id to req.id for next getUser function
        next(); 

    })

       


    

}

//Refresh The Token

const refreshToken =async(req,res,next)=>{
    const cookies = req.headers.cookie;
    let prevToken;
    if(typeof cookies ==='string'){
         prevToken  = cookies.split("=")[1];//slipt headers from token
    }

    if(!prevToken){
        res.status(400).json({message:"No Token found"})
    }
    jwt.verify(String(prevToken),process.env.TOKEN_PRIVATE_KEY,(err,decode)=>{
        if(err){
            return res.status(403).json({message:"Authentication failed"})
        }

        //after token verify
        res.clearCookie(`${decode.id}`);
        req.cookies[`${decode.id}`]="";//rest cookie from headers {headers is object}

        //after reset cookie - Generating New Token

        const newToken = jwt.sign({id:decode.id},process.env.TOKEN_PRIVATE_KEY,{
            expiresIn:"1h",
        })

        //define new cookies

        res.cookie(String(decode.id),newToken,{
            path:"/",
            expires: new Date(Date.now()+1000*30),//30 sec expire
            httpOnly:true,
            sameSite:'lax'
        })

        req.id = decode.id;// set request header to user id which we get from decode .id 
        next(); 


    })

    
}

//get user to checking in login 
const getUser = async(req,res)=>{
    const userID = req.id;
    let user;
    try {
        user = await database.findOneUserById(userID);
        console.log(user);
    } catch (error) {
        return new Error(error);
    }

    if(!user){
        return res.status(404).json({message:"User Not Found"})
    }

    return res.status(200).json({user});
}

//get candidate details

const getCandidateForUser = async(req,res)=>{
    let candidate;
    try {
        candidate = await database.findAllCandidates();
        console.log(candidate);
    } catch (error) {
        return new Error(error);
        
    }

    if(!candidate){
        return res.status(404).json({message:"Candidate Note Found"})
    }

    return res.status(200).json({candidate});

}


//submit vote function - 

const submitVote = async(req,res)=>{
    const candidateID =await req.body.id;
    console.log(`Hey Folks ! This is vote id ${candidateID}`);
    console.log(typeof candidateID);
    await database.createVote(candidateID);

    return res.status(200).json({message:"Succesfully submitted vote"});
}

//logout function

const logout = (req,res)=>{
    const cookies = req.headers.cookie;
    let prevToken;
    if(typeof cookies ==='string'){
         prevToken  = cookies.split("=")[1];//slipt headers from token
    }

    if(!prevToken){
        res.status(400).json({message:"No Token found"})
    }




    jwt.verify(String(prevToken),process.env.TOKEN_PRIVATE_KEY,(err,decode)=>{
        if(err){
            return res.status(403).json({message:"Authentication failed"})
        }

        //after token verify
        res.clearCookie(`${decode.id}`);
        req.cookies[`${decode.id}`]="";//rest cookie from headers {headers is object}

       

       return res.status(200).json({message:"Successfully Logged Out"})


    })
   
        
}



module.exports={
    userLogin:userLogin,
    userRegistration:userRegistration,
    verifyToken:verifyToken,
    getUser:getUser,
    getCandidateForUser:getCandidateForUser,
    refreshToken:refreshToken,
    logout:logout,
    submitVote:submitVote,

}