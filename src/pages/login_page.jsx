import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Login_page = () => {

  const {backendUrl,setIsLoggedIn}=useContext(AppContext)

   const [state,setState]= useState('sign up');
   const [name,setName]= useState('');
   const [email,setEmail]= useState('');
   const [phone,setPhone]= useState();
   const [password,setPassword]= useState('');
   const submitHandler=async(e)=>{
    try {
      e.preventDefault()
      if(state==='sign up'){
       const {data}= await axios.post(backendUrl + '/api/auth/register',{name,email,phone,password,role:'admin'})
      }else{}
      
    } catch (error) {
      
    }
   }
  return (
 <div className=' min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-blue-200'>
      <h2>{state==='sign up' ? 'register' : 'login'}</h2>


      <form className='bg-blue-400' onSubmit={submitHandler}>
        {state==='sign up' && (<input onChange={e=>setName(e.target.value)}
        value={name}
         type="text" placeholder='Full Name' required/>)}
        {state==='sign up' && (  <input  onChange={e=>setPhone(e.target.value)}
        value={phone}type="number" placeholder='Phone Number' required/>)}
          
          <input  onChange={e=>setEmail(e.target.value)}
        value={email} type="email" placeholder='E mail' required/><br />
        
          <input  onChange={e=>setPassword(e.target.value)}
        value={password}type="password" placeholder='Password' required/><br />
          <button>{state}</button>
        
      </form>
   {state==='sign up'? (<p>already have an account <span onClick={()=>setState('Login')}>login</span></p>):( <p>Dont have an account <span onClick={()=>setState('sign up')}>register</span></p>)}
      
     
    </div>
  )
}

export default Login_page
