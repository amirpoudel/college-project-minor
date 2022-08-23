import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store';


import VotingTable from './votingTable';




axios.defaults.withCredentials = true;


let firstRender = true;



export default function User() {

  // ------------------------------define state--------------------------------------------------

  const [user, setUser] = useState();

  const [candidate, setCandidate] = useState();


  // react redux
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  //-------------------------Send Request To Backend----------------------------------------------


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
    }).catch(err => console.log(err));

    
    const data = await res.data;
      return data;
  
    
  }


  //Send Request To get Candidate Infromation - except Total votes 

  const sendCandiateRequest = async()=>{
    const res  = await axios.get('/getCandidateForUser',{
      withCredentials:true,
    }).catch(err=>console.log(err))

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

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      
      sendRequest().then((data) => {
    
        setUser(data.user)
      });



      // sendCandiateRequest().then((data)=>{
      //   setCandidate(data.candidate);
      // })
    
      
    }

    let interval = setInterval(() => {
      refreshToken().then((data)=>{
        
        setUser(data.user);
        
      })
    }, 1000 * 28)



    return () => clearInterval(interval)
  }, [])




  return (
    <>
      <div>Welcome To Online Voting System ! Vote Your Fav Candidate!
        <Link onClick={handleLogOut} to='/'>Log Out</Link>
      </div>


      {user && <h1>{user.firstName} {user.lastName} - Voter ID : {user.voterID}</h1>}
      {user && <h3>{user.email} </h3>}

      {user && <VotingTable/>}
      






    </>



  )
}
