import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store';
import './user.css'

import VotingTable from './votingTable';




axios.defaults.withCredentials = true;


let firstRender = true;



export default function User() {

  // ------------------------------define state--------------------------------------------------

  const [user, setUser] = useState();

  const [candidate, setCandidate] = useState([]);

  const [voteID,setVoteID] = useState();

  //-----------------------------------Get Data From Child Component--

  const getCandidateID = (id)=>{
    setVoteID(id);
    
    // if(voteID){
    //   sumbitVote();
    // }
    if(id){
      sumbitVote(id);
      console.log(`Candidate Id from Main Component ${id}`);
    }
    
  }



  // react redux
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  //-------------------------Send Request To Backend----------------------------------------------



  //Send Request To Submit Vote
  const sumbitVote = async(id)=>{
    const voteData = {
      method:'post',
      url:'/submitVote',
      data:{id:id},
    }

    axios(voteData).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  }


  //Send Request For Logout 
  const sendLogOutReq = async () => {
    const res = await axios.post("/logout", null, {
      withCredentials: true
    })
    if (res.status === 200) {
      console.log("logout sucess");
      console.log(res);
      return res
    }
    return new Error("Unable To Logout. Please try again");
  }

  //Send Request To get User Information

  const sendRequest = async () => {
    const res = await axios.get('/user', {
      withCredentials: true,
    }).catch((err)=>{
      return err;
    });

    
    const data = await res.data;
      return data;
  
    
  }


  //Send Request To get Candidate Infromation - except Total votes 

  const sendCandiateRequest = async()=>{
    const res  = await axios.get('/getCandidateForUser',{
      withCredentials:true,
    }).catch((err)=>{
      return err;
    })

    const data = await res.data;
    
    return data;
  }



  //Send Request To Refresh Token
  const refreshToken = async () => {
    const res = await axios.get('/refresh', {
      withCredentials: true,
    }).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }


  //------------------------------------------------Event Handling--------------------------------------------
  const handleLogOut = () => {
    sendLogOutReq().then(() => {
      dispatch(authActions.logout())
    })
  }

  

  



  //-------------- Effect Hook--------------------------------- 

  //useEffect for submit state value (vote) imeditatly-------

  // useEffect(()=>{
  //   sumbitVote();
  //   console.log("vote submit from user ");
  // },[])

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      
      sendRequest().then((data) => {
        if(data){
          
          setUser(data.user)
        }
        
      });


      sendCandiateRequest().then((data)=>{
        if(data){
          setCandidate(data.candidate);
        }
      })


    }

    let interval = setInterval(() => {
      refreshToken().then((data)=>{
        
        setUser(data.user);
        
      })
    }, 1000 * 5800)



    return () => clearInterval(interval)
  }, [])





   


 




  return (

    <>
    <div id='user'>
      <div id="welcomeText" >Welcome To Online Voting System !<br/> <span>Vote Your Fav Candidate!</span>
        
      </div>
      <div id='logOut'><button><Link onClick={handleLogOut} to='/'>Log Out</Link> </button></div>


      {user && <h1>{user.firstName} {user.lastName} - Voter ID : {user.voterID}</h1>}
      {user && <h3>username - {user.email} </h3>}

      {user && <VotingTable candidate={candidate} getVoteID={getCandidateID}/>}
      
      </div>
      
     


    </>



  )
}
