
// import React from 'react';
// import './home.css'
// import { Link} from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export default function Home() {

    
//     return (<>
    
//         <div className='home'>


//             <div >Welcome To Online Voting System</div>
//             <Link to='/userLogin'>User Login</Link><br/>
//             <Link to='/adminLogin'>Admin Login</Link><br/>
//             <Link to='/adminRegistration'>Admin Registration</Link><br/>
            
            

         
           
//         </div>
        
//     </>
//     )
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import userIcon from "../Images/userIcon.png";
import adminIcon from "../Images/adminIcon.png";
import adminRegistrationIcon from "../Images/adminRegistration.png";

function Home() {
  const navigate = useNavigate();
  const goToUser = () => {
    navigate("/userlogin");
  };
  const gotToAdmin = () => {
    navigate("/adminlogin");
  };
  const goToAdminRegirstration = () => {
    navigate("/adminregistration");
  };
  return (
    <div className="choose">
      <div className="chooseContainer">
        <div className="chooseHeading">
          <h5>Online Voting</h5>
          <h4>Sign In Option</h4>
        </div>
        <div className="chooseItem">
          {/* change route on click div tag */}

          <div onClick={() => goToUser()}>
            <span>
              <img src={userIcon} alt="userIcon" />

              <h4>As User</h4>
            </span>
            <p>Sign in as User</p>
          </div>
          <div onClick={() => gotToAdmin()}>
            <span>
              <img src={adminIcon} alt="adminIcon" />
              <br></br>
              <h4>As Admin</h4>
            </span>

            <p>Sign in as Admin</p>
          </div>
          <div onClick={() => goToAdminRegirstration()}>
            <span>
              <img src={adminRegistrationIcon} alt="adminIcon" />
              <h4>Admin Registration</h4>
            </span>
            <p>Create new Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
