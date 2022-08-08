
import React,{useState} from 'react';
import './login.css';
import PropTypes from 'prop-types';

export default function Login(props) {
    let [user,setUser] = useState({
        username:"",
        password:""
    });
    let name, value;
    let handleOnChange = (event)=>{
        name = event.target.name; // this is store name of tag in input field
        value = event.target.value;//this is store value of that particular field
        
        setUser({...user,[name]:value});
    }
    const handleOnClick = ()=>{
        console.log(`Username is ${user}`);
    }
    return (
        <>  
            <div className='login'>
                <h3>{props.title} Login</h3>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={user.username} onChange={handleOnChange}/>
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