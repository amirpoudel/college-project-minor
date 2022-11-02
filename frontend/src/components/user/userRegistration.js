import React,{useState} from 'react'
import axios from 'axios';
import './userRegistration.css';
import sideImage from '../../Images/adminSideImage.png'
import {useNavigate} from "react-router-dom"
export default function UserRegistration() {

    const history = useNavigate();
    //------------------------------------------------------------STATE----------------------------------------------------
    const [user,setUser]=useState({
        votingID:"",
        firstName:"",
        middleName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
    })


    //-------------------------------------------------------------Event Handling--------------------------------------------

    let name,value;
    const handleOnChange = (event)=>{
        name = event.target.name;
        value = event.target.value;
        setUser({...user,[name]:value});
    }

    const handleOnClick=(event)=>{
        event.preventDefault();
        postData().then(()=>{
            alert("User Registration Success");
        });
    }

    //----------------------------------------------------------Post Request Function--------------------------------------------

    async function postData(){
        const config={
            method:'post',
            url:'/userRegistration',
            data:user
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

   



    return (<>
    {/* <div id='registration'>
        <div id='registrationForm'>
            <div>User  Registration</div>
            <label htmlFor="votingID">Voting ID:</label>
            <br />
            <input type="number" id="votingID" name="votingID" value={user.votingID} onChange={handleOnChange} />
            <br />
            <label htmlFor="firstName">First name:</label>
            <br />
            <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleOnChange} />
            <br />
            <label htmlFor="middleName">Middle name:</label>
            <br />
            <input type="text" id="middleName" name="middleName" value={user.middleName} onChange={handleOnChange} />
            <br />
            <label htmlFor="lastName">Last name:</label>
            <br />
            <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleOnChange} />
            <br />
            <label htmlFor="email">Email:</label>
            <br />
            <input type="email" id="email" name="email" value={user.email} onChange={handleOnChange} />
            <br />
            <label htmlFor="password">Password:</label>
            <br />
            <input type="password" id="password" name="password" value={user.password} onChange={handleOnChange} />
            <br />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <br />
            <input type="password" id="confirmPassword" name="confirmPassword" value={user.confirmPassword} onChange={handleOnChange} />
            <br />
            <button type="submit" defaultValue="Submit" onClick={handleOnClick} >Submit</button>
        </div>

        </div> */}



<div className="register">
        <div className="col-1">
          <img src={sideImage} alt="Voting" id="sideImageAdmin" />
        </div>
        <div className="col-2">
          <h2>User Registration</h2>
          <span>Create User Account</span>
          <div id="form" className="flex flex-col">
            <div className="inputContainer">
              <label htmlFor="votingID" className="labelPosition">
                Voting ID:
              </label>
              <input
                type="number"
                id="votingID"
                name="votingID"
                value={user.votingID}
                onChange={handleOnChange}
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="firstName" className="labelPosition">
                First name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={user.firstName}
                onChange={handleOnChange}
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="middleName" className="labelPosition">
                Middle name:
              </label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={user.middleName}
                onChange={handleOnChange}
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="lastName" className="labelPosition">
                Last name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={user.lastName}
                onChange={handleOnChange}
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="email" className="labelPosition">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleOnChange}
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="password" className="labelPosition">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleOnChange}
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="confirmPassword" className="labelPosition">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleOnChange}
              />
            </div>
            <button
              type="submit"
              className="btn"
              defaultValue="Submit"
              onClick={handleOnClick}
            >
              Submit
            </button>
          </div>
        </div>
      </div>


    </>
    )
}
