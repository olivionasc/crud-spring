import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import PrivateRoute from './services/PrivateRoute'

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={
    <PrivateRoute>
        <Home />
    </PrivateRoute>
} />
    </Routes>
    </div>
  )
}

export default App
