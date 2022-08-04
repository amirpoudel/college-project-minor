
import React from 'react';
import './login.css';
import PropTypes from 'prop-types';

export default function login(props) {
    return (
        <>  
            <div className='login'>
                <h3>{props.title} Login</h3>
                <label htmlFor="fname">Username:</label>
                <input type="text" id="fname" name="fname" />
                <br />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />
                <br />
                <br />
                <input type="submit" defaultValue="Submit" />


            </div>
        </>
    )
}

login.propTypes={title:PropTypes.string.isRequired};