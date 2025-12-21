import { useState } from 'react'
import HomePage from './pages/HomePage'
import TeamPage from './pages/TeamPage'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="team" element={<TeamPage />} />
      </Routes>
    </>
  )
}

export default App
