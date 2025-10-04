import React, { useState } from 'react'
import Navbar from '../components/Navbar'


const Home_page = () => {
  const [books,setBooks]=useState([])
const viewBooks=async()=>{
  try { 
    const res= await fetch('http://localhost:8000/api/book/view-books')
    const data= await res.json()
    
    setBooks(data.books)
    console.log(books);
    
   
  }
  catch (error) {
    
  } 
}
viewBooks()
  return (
    
    <div>
      <Navbar/>
      {books.length > 0 ? (
          <ul>
            {books.map((book, index) => (
              <li key={index}> 
              <div className="ml-2">
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                  </div>
              </li>
            
            ))}
          </ul>
        ) : (
          <p>No books found.</p>
        )}
     </div>
   
  )
  

}

export default Home_page
