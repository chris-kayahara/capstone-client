import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";

import Header from './components/Header/Header';
import UserHomePage from './pages/UserHomePage/UserHomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import ViewPage from './pages/ViewPage/ViewPage';
import Footer from './components/Footer/Footer';

import './App.scss';
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    // is there a token in session storage?
    !!sessionStorage.getItem("token")
  );

  return isUserLoggedIn ? (
    <main className="App">
      <BrowserRouter>
        <Header setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn}/>
        <Routes>
          <Route path='/' element={<UserHomePage setIsUserLoggedIn={setIsUserLoggedIn}/>}></Route>
          <Route path='/gallery' element={<GalleryPage/>}></Route>
          <Route path='/gallery/:documentId' element={<ViewPage/>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  ) : (
      <BrowserRouter>
        <Header setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn}/>
        <Routes>
          <Route path='/' element={<LoginPage setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn}/>}></Route>
          <Route path='/signup' element={<SignUpPage/>}></Route>
          <Route path='/gallery' element={<div>Please login</div>}></Route>
          <Route path='/*' element={<div>404: Page Not Found</div>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
