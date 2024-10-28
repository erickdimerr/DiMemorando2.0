import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx';
import Index from './pages/index.jsx';


function App() {

  return (
    <>
      <div>
        <Index />
      </div>
    </>
  )
}

export default App