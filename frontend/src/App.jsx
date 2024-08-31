import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './components/Homepage'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import About from './components/About'
import Contact from './components/Contact'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
      <Route path={'/'} element={<Homepage/>}></Route>
      <Route path={'/signup'} element={<Signup/>}></Route>
      <Route path={'/login'} element={<Login/>}></Route>
      <Route path={'/about'} element={<About/>}></Route>
      <Route path={'/contactus'} element={<Contact/>}></Route>
      </Routes>
    </>
  )
}

export default App
