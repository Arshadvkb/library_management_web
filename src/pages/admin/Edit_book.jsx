import React from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";

const Edit_book = (Book) => {
 const {title}=Book
  console.log( title + "book from edit page");
  
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-purple-300 to-blue-600">
        <form >
           <div className="flex flex-col flex-wrap gap-2 bg-blue-400 p-4 rounded-xl m-4">
          <input className="bg-blue-300 p-2 rounded-2xl" type="text" placeholder="book tile" />
          <input className="bg-blue-300 p-2 rounded-2xl" type="text" placeholder="Author" />
          <input className="bg-blue-300 p-2 rounded-2xl" type="number" placeholder="ISBN" />
          <input className="bg-blue-300 p-2 rounded-2xl" type="date" placeholder="Published Date" /><br />
          <button className="bg-blue-300 p-2 rounded-2xl">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit_book;
