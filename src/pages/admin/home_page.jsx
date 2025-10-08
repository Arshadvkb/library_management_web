import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const Home_page = () => {
  const { backendurl } = useContext(AppContext);
  const [books, setBooks] = useState([]);
  const viewBooks = async () => {
    try {
      const res = await fetch(backendurl + "/api/book/view-books");
      const data = await res.json();

      setBooks(data.books);
      console.log(books);
    } catch (error) {}
  };

  useEffect(() => {
    viewBooks();
  }, []);

  const deletefunction = async (id, e) => {
    console.log("id==========" + id);

    const data = await axios.delete(backendurl + `/api/book/delete-book/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen  bg-gradient-to-br from-purple-300 to-blue-600 p-4">
        <h1 className="text-center font-semibold text-xl">Available book</h1>
        {books.length > 0 ? (
          <ul className="flex flex-wrap gap-6 justify-center items-center ">
            {books.map((book, index) => (
              <li key={index}>
                <div className="ml-2 h-auto lg:w-200 sm:w-100  rounded-xl border-1 bg-blue-400 p-2 ">
                  {book.image && book.image.secure_url ? (
                    <div className="mb-4">
                      {
                        <img
                          style={{
                            height: book.image.height,
                            width: book.image.width,
                          }}
                          src={book.image.secure_url}
                          alt={`${book.title} cover`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      }
                    </div>
                  ) : (
                    <p className="text-gray-200">No media available.</p>
                  )}
                  <h2>{book.title}</h2>
                  <p>Author: {book.author}</p>
                  <p>ISBN:{book.ISBN}</p>
                  <p>Published Date:{book.publishedDate}</p>
                  <p>Available count:{book.count}</p>
                  <button
                    className="bg-red-700 rounded-xl p-2"
                    onClick={deletefunction.bind(this, book._id)}
                  >
                    delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Home_page;
