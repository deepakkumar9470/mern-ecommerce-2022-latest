import React from 'react'
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';

import MyLogin from './pages/MyLogin';
import MySignUp from './pages/MySignUp';


function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop/>
      <Navigation/>
         <Routes>
                <Route path="/" exact element={<Home/>}/>            
                <Route path='/login' element={<MyLogin/>}/>
                <Route path='/signup' element={<MySignUp/>}/>
         </Routes>
      </BrowserRouter>
       
       
    </div>
  );
}

export default App;
