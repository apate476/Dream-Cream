import { useState } from 'react';
import Login from './components/Login';
import AllIceCream from './components/AllIcecream'

import { Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<AllIceCream />} />
      </Routes>
    </>
    
  );
}

export default App;
