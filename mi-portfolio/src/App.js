import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Hobby from './pages/Hobby';



function App() {
  return (
    <div className="App">
      <main>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/hobby" element={<Hobby />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
