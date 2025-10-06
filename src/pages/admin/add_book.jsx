import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const Add_book = () => {
    const {backendurl}=useContext(AppContext)
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setDate] = useState("");
  const [ISBN, setIsbn] = useState("");
  const [count, setCount] = useState("");
  
  const bookadded=()=> toast('book added successfuly')

  const submitHandler=async(e)=>{
    e.preventDefault()
    const {data}=await axios.post(backendurl +'/api/book/add-book' ,{
        title,
        author,
        publishedDate,
        ISBN,
        count
    })
    const {success}=data
    if(success)
    {
      bookadded()
    }
    console.log(data);
    

  }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-purple-300 to-blue-600">
        <form  onSubmit={submitHandler}>
          <div className="flex flex-col flex-wrap gap-2 bg-blue-400 p-4 rounded-xl m-4">
            <input
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
              className="bg-blue-200 p-2 rounded-2xl"
              type="text"
              placeholder="Book Title.."
            />
            <input
             onChange={(e)=>setAuthor(e.target.value)}
            value={author}
              className="bg-blue-200 p-2 rounded-2xl"
              type="text"
              placeholder="Author"
            />
            <input
             onChange={(e)=>setDate(e.target.value)}
            value={publishedDate}
              className="bg-blue-200 p-2 rounded-2xl"
              type="date"
              placeholder="Published Date"
            />
            <input
             onChange={(e)=>setIsbn(e.target.value)}
            value={ISBN}
              className="bg-blue-200 p-2 rounded-2xl"
              type="number"
              placeholder="ISBN"
            />
            <input
             onChange={(e)=>setCount(e.target.value)}
            value={count}
              className="bg-blue-200 p-2 rounded-2xl"
              type="number"
              placeholder="count"
            />
            <br />
            <button className="bg-blue-200 p-2 rounded-2xl">Add Book</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_book;
