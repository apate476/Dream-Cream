import { useState } from 'react';
import Login from './components/Login';
import AllIceCream from './components/AllIcecream'

import { Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
    <header>

    </header>

    <body>
    <Routes>
        <Route path='/' element={<AllIceCream />} />
    </Routes>
    </body>

    <footer>
      
    </footer>
      
    </>
    
  );
}

export default App;
