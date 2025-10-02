import React from 'react'
import { Route,Routes } from 'react-router-dom'
import home_page from './pages/home_page'
import login_page from './pages/login_page'
import register_page from './pages/register_page'


const App = () => {
  return (
    <div >
     <Routes>
      <Route path='/' element={<home_page/>}/>
      <Route path='/login' element={<login_page/>} />
      <Route path='/register' element={<register_page/>} />
     </Routes>

    </div>
  )
}

export default App
