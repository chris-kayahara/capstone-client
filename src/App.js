import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserHomePage from './pages/UserHomePage/UserHomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import Footer from './components/Footer/Footer';

import './App.scss';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserHomePage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/signup' element={<SignUpPage/>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
