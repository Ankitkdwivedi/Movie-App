import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './Components/Login-Signup/Login'
import SignUp from './Components/Login-Signup/SignUp'
import './index.css'
import Home from './Components/Home/Home'
import Show from './Components/Home/Show'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/show/:imdbID" element={<Show />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
