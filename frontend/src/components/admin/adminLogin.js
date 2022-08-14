
import React,{useState} from 'react';
import './adminLogin.css';

import axios from 'axios'

export default function Login(props) {
    let [admin,setAdmin] = useState({
        username:"",
        password:""
    });
    let name, value;
    let handleOnChange = (event)=>{
        name = event.target.name; // this is store name of tag in input field
        value = event.target.value;//this is store value of that particular field
        
        setAdmin({...admin,[name]:value});
    }

    async function postData(){
        const config = {
            method:'post',
            url:'/adminLogin',
            data:admin
        }

        axios(config).then(function(res){
            console.log(res.data.message)
            
        }).catch(function(err){
            console.log(err);
        })
    }

    const handleOnClick = ()=>{
        postData();
    }
    return (
        <>  
            <div className='login'>
                <h3>Admin Login</h3>
                <label htmlFor="username">Username:</label>
                <input type="email" id="username" name="username" value={admin.username} onChange={handleOnChange}/>
                <br />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={admin.password} onChange={handleOnChange} />
                <br />
                <br />
                <button type="submit" defaultValue="Submit" onClick={handleOnClick} >Submit</button>

            </div>
        </>
    )
}