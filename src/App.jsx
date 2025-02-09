import { useState } from 'react'
import {BrowserRouter as Router, Routes , Route} from "react-router-dom"
import './App.css'
import TypingBox from "./components/TypingBox"
import Landing from "./components/Landing"
import Header from './components/Header/Header'
import About from './components/About'

function App() {

  return (
      <Router>
          <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/typing' element={<TypingBox/>}/>
          </Routes>
      </Router>
  )
}

export default App
