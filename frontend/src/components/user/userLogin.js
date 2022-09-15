
import React,{useState} from 'react';
import './login.css';
import PropTypes from 'prop-types';
import axios from 'axios'
import {useNavigate} from "react-router-dom"

export default function Login(props) {
    const history = useNavigate();
    //---------------------------------------------------------------STATE-----------------------------------------------------
    let [user,setUser] = useState({
        username:"",
        password:""
    });

    //---------------------------------------------------------------Event Handling-------------------------------------------

    let name, value;
    let handleOnChange = (event)=>{
        name = event.target.name; // this is store name of tag in input field
        value = event.target.value;//this is store value of that particular field
        
        setUser({...user,[name]:value});
    }


    const handleOnClick = ()=>{
        postData();
        
    }

    //--------------------------------------------------------------Post Data Request Function--------------------------------
    async function postData(){
        const config = {
            method:'post',
            url:'/userLogin',
            data:user
        }

        axios(config).then(function(res){
            
            console.log(res.data.message)
            console.log(res.data.token)
            history("/user");
            
            
        }).catch(function(err){
            console.log(err.response.data.message)
            console.log(err);
        })
    }

   
    return (
        <>  
            <div className='login'>
                <h3>{props.title} Login</h3>
                <label htmlFor="username">Username:</label>
                <input type="email" id="username" name="username" value={user.username} onChange={handleOnChange}/>
                <br />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={user.password} onChange={handleOnChange} />
                <br />
                <br />
                <button type="submit" defaultValue="Submit" onClick={handleOnClick} >Submit</button>

            </div>
        </>
    )
}

Login.propTypes={title:PropTypes.string.isRequired};