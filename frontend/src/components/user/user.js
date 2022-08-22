import React, { useEffect, useState } from 'react';
import axios  from 'axios';

import { Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store';
axios.defaults.withCredentials = true;


let firstRender=true;



export default function User() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state=>state.isLoggedIn);
  const sendLogOutReq = async()=>{
    const res  = await axios.post("/logout",null,{
      withCredentials:true
    })
    if(res.status===200){
      console.log("logout sucess");
      console.log(res);
      return res
    }
    return new Error ("Unable To Logout. Please try again");
  } 
  const handleLogOut = ()=>{
    sendLogOutReq().then(()=>{
      dispatch(authActions.logout())
    })
  }

  const [user,setUser] = useState();

  const sendRequest = async ()=>{
      const res = await axios.get('/user',{
        withCredentials:true,
      }).catch(err=>console.log(err));


      const data = await res.data;
      return data;
  }

  const refreshToken = async ()=>{
    const res = await axios.get('/refresh',{
      withCredentials:true,
    }).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }

  useEffect(()=>{
    if(firstRender){
      firstRender = false;
      sendRequest().then((data)=>{
          setUser(data.user)

        });

    }

    let interval = setInterval(()=>{
      refreshToken().then(data=>setUser(data.user))
    },1000 * 28)

    
    
    return ()=>clearInterval(interval)
  },[])



  
  return (
    <>
    <div>Welcome To Online Voting System ! Vote Your Fav Candidate!
    <Link onClick={handleLogOut} to='/'>Log Out</Link>  
    </div>

    
    {user && <h1>{user.firstName} {user.lastName} - Voter ID : {user.voterID}</h1>}
    {user && <h3>{user.email} </h3>}
     

    </>
    


  )
}
