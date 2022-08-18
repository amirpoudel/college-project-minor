import React,{useEffect,useState} from 'react'
import axios from 'axios';

axios.defaults.withCredentials = true;

let firstRender = true;

export default function Admin() {

  const [admin,setAdmin]=useState();

  const sendRequest = async()=>{
    const res = await axios.get('/admin',{
        withCredentials:true,
    }).catch((err)=>{
        console.log(err);
    })
   
    const data = await res.data;
    return data;
    
  }

  useEffect(()=>{
    sendRequest().then((data)=>{
        
        setAdmin(data.admin);
    })
  },[])


  return (
    <div>
        <h1>Welcome To Admin Page</h1>
        {admin && <h1>{admin.firstName}</h1>}
    </div>
  )
}
