import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
  return (
    <main className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<UserHomePage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/signup' element={<SignUpPage/>}></Route>
          <Route path='/upload' element={<UploadImages/>}></Route>
          <Route path='/create' element={<CreatePage/>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
