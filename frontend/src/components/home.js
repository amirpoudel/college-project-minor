
import React from 'react';
import './home.css'
import { Link, Route } from 'react-router-dom';

export default function Home() {
    return (<>
    
        <div className='home'>


            <div >Welcome To Online Voting System</div>
            <Link to='/userLogin'>User Login</Link><br/>
            <Link to='/adminLogin'>Admin Login</Link><br/>
            <Link to='/adminRegistration'>Admin Registration</Link>
        </div>
        
    </>
    )
}
