
import './App.css';
import Login from './components/user/login';
import AdminLogin from './components/admin/adminLogin';
import AdminRegistration from './components/admin/adminRegistration';
import Home from './components/home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRegistration from './components/user/userRegistration';
import CandidateRegistration from './components/candidate/candidateRegistration';

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route exact path='/' element={<Home />} />
          <Route exact path='/userLogin' element={<Login title='User' />} />
          <Route exact path='/adminLogin' element={<AdminLogin/>} />
          <Route extact path='/adminRegistration' element={<AdminRegistration/>}/>
          <Route extact path='/userRegistration' element={<UserRegistration/>}/>
          <Route exact path='/candidateRegistration' element={<CandidateRegistration/>}/>
        </Routes>

      </BrowserRouter>

    </>

  );
}

export default App;
