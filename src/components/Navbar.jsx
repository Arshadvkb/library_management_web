import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'


const Navbar = () => {
  const {isLogggedIn}=useContext(AppContext)
  return (
    <div className='bg-blue-400 h-10 w-auto flex justify-between p-4'>
      <h1>library</h1>

      <ul className='flex justify-between pl-5 gap-3'>
        <li ><a href="/home">home</a></li>
      
        <li ><a href="/">login</a></li>
        <li ><a href="/add-book">add book</a></li>

       
      </ul>
    </div>
  )
}

export default Navbar
