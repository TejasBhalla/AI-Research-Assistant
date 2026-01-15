import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Navbar from './components/Navbar.tsx'
import Upload from './pages/Upload.tsx'
import Ask from './pages/Ask.tsx'


function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/upload" element={<Upload/>}></Route>
      <Route path="/ask" element={<Ask/>}></Route>
    </Routes>
    </>
  )
}

export default App
