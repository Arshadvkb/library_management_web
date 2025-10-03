import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home_page from './pages/Home_page'
import Login_page from './pages/login_page'
import Register_page from './pages/register_page'


const App = () => {
  return (
    <div >
     <Routes>
      <Route path='/' element={<Home_page/>}/>
      <Route path='/login' element={<Login_page/>} />
      <Route path='/register' element={<Register_page/>} />
     </Routes>

    </div>
  )
}

export default App
