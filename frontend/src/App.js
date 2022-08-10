
import './App.css';
import Login from './components/login';
import AdminRegistration from './components/adminRegistration';
import Home from './components/home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route exact path='/' element={<Home />} />
          <Route exact path='/userLogin' element={<Login title='User' />} />
          <Route exact path='/adminLogin' element={<Login title='Admin' />} />
          <Route extact path='/adminRegistration' element={<AdminRegistration/>}/>
        </Routes>

      </BrowserRouter>

    </>

  );
}

export default App;
