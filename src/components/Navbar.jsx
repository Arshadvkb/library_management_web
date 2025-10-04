import React from 'react'


const Navbar = () => {
  return (
    <div className='bg-blue-400 h-10 w-auto flex justify-between p-4'>
      <h1>library</h1>

      <ul className='flex justify-between pl-5'>
        <li ><a href="/">home</a></li>
        <li ><a href="/login">login</a></li>
        
       
      </ul>
    </div>
  )
}

export default Navbar
