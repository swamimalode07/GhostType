import { useState } from 'react'
import {BrowserRouter as Router, Routes , Route} from "react-router-dom"
import './App.css'
import TypingBox from "./components/TypingBox"
import Landing from "./components/Landing"
import Layout from './components/Layout'
import About from './components/About'
import Leaderboard from "./components/Leaderboard"
import Results from "./components/Results"

function App() {

  return (
      <Router>
          <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Landing/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/typing' element={<TypingBox/>}/>
              <Route path='/layout' element={<Layout/>}/>
              <Route path='/leaderboard' element={<Leaderboard/>}></Route>
              <Route path='/results' element={<Results/>}></Route>
              </Route>
          </Routes>
      </Router>
  )
}

export default App
