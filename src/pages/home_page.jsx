import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";

const Home_page = () => {
  const { backendurl} = useContext(AppContext);
  const [books, setBooks] = useState([]);
  const viewBooks = async () => {
    try {
      const res = await fetch(backendurl + "/api/book/view-books");
      const data = await res.json();

      setBooks(data.books);
      console.log(books);
    } catch (error) {}
  };
  viewBooks();
  return (
    <div>
      <Navbar />

      <h1 className="text-center font-semibold text-xl">Available book</h1>
      {books.length > 0 ? (
        <ul className="flex flex-wrap h-96 gap-6 justify-center items-center">
          {books.map((book, index) => (
            <li key={index}>
              <div className="ml-2 h-auto w-auto border-2 bg-blue-400 p-2 ">
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>ISBN:{book.ISBN}</p>
                <p>Published Date:{book.publishedDate}</p>
                <p>Available count:{book.count}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
};

export default Home_page;
