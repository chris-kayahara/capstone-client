import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";

import Header from './components/Header/Header';
import UserHomePage from './pages/UserHomePage/UserHomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import CreatePage from './pages/CreatePage/CreatePage';
import Footer from './components/Footer/Footer';

import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";

import UploadImages from './components/UploadImages/UploadImages';

function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    // is there a token in session storage?
    !!sessionStorage.getItem("token")
  );

  return isUserLoggedIn ? (
    <main className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<UserHomePage setIsUserLoggedIn={setIsUserLoggedIn}/>}></Route>
          <Route path='/create' element={<CreatePage/>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  ) : (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<LoginPage setIsUserLoggedIn={setIsUserLoggedIn}/>}></Route>
          <Route path='/signup' element={<SignUpPage/>}></Route>
          <Route path='/create' element={<div>Please login</div>}></Route>
          <Route path='/*' element={<div>404: Page Not Found</div>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
