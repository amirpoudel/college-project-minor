import React,{useState} from 'react';
import axios from 'axios';
import './candidateRegistration.css';

export default function CandidateRegistration() {

    const [candidate,setCandidate]=useState({
        candidateID:"",
        firstName:"",
        middleName:"",
        lastName:"",
        post:"",

    })
    let name,value
    const handleOnChange=(event)=>{
        name = event.target.name;
        value = event.target.value;
        setCandidate({...candidate,[name]:value})
    }

    async function postData(){
        const config={
            method:'post',
            url:'/candidateRegistration',
            data:candidate
        }
        axios(config).then(function(res){
            console.log(res);
            
            
   
        }).catch(function(err){
            console.log(err);
            console.log(err.response.status)
            if(err.response.status===500){
                alert("Password Doesnot Match");
            }
        })
    }

    const handleOnClick=()=>{
        postData();
    }

  return (
    <>
    
    <div className='registration'>
            <div>Candidate  Registration</div>
            <label htmlFor="candidateID">Candidate ID:</label>
            <br />
            <input type="number" id="candidateID" name="candidateID" value={candidate.candidateID} onChange={handleOnChange} />
            <br />
            <label htmlFor="firstName">First name:</label>
            <br />
            <input type="text" id="firstName" name="firstName" value={candidate.firstName} onChange={handleOnChange} />
            <br />
            <label htmlFor="middleName">Middle name:</label>
            <br />
            <input type="text" id="middleName" name="middleName" value={candidate.middleName} onChange={handleOnChange} />
            <br />
            <label htmlFor="lastName">Last name:</label>
            <br />
            <input type="text" id="lastName" name="lastName" value={candidate.lastName} onChange={handleOnChange} />
            <br />
            <label htmlFor="post">Post:</label>
            <br />
            <input type="text" id="post" name="post" value={candidate.post} onChange={handleOnChange} />
            <br />

           
            <button type="submit" defaultValue="Submit" onClick={handleOnClick} >Submit</button>
        </div>
    
    </>
  )
}
