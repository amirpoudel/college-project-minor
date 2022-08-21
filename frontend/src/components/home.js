
import React from 'react';
import './home.css'
import { Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Home() {

    
    return (<>
    
        <div className='home'>


            <div >Welcome To Online Voting System</div>
            <Link to='/userLogin'>User Login</Link><br/>
            <Link to='/adminLogin'>Admin Login</Link><br/>
            <Link to='/adminRegistration'>Admin Registration</Link><br/>
            
            

         
           
        </div>
        
    </>
    )
}
