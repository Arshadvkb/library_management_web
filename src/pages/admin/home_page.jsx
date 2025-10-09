import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home_page = () => {
  const { backendurl } = useContext(AppContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState(null);
  const [modalAlt, setModalAlt] = useState("");

  const deletToast=()=> toast("book deleted successfuly")
const navigate=useNavigate()
  const viewBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(backendurl + "/api/book/view-books");
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      setBooks(Array.isArray(data.books) ? data.books : []);
      console.log("loaded books", data.books);
    } catch (err) {
      console.error(err);
      setError("Failed to load books. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    viewBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deletefunction = async (id) => {
    const ok = window.confirm(
      "Delete this book? This action cannot be undone."
    );
    if (!ok) return;
    try {
      const data=await axios.delete(backendurl + `/api/book/delete-book/${id}`);
      const {success}=data.data
     if(success){ deletToast()}
      
      
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete the book. Please try again.");
    }
  };
  const editfunction=(id,e)=>{
 navigate("/edit-book",{state:{id:id}})

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-blue-200">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Available Books
          </h1>
          <div className="text-sm text-gray-600">Total: {books.length}</div>
        </header>

        <section>
          {loading ? (
            <div className="p-8 text-center text-gray-600">Loading books…</div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">{error}</div>
          ) : books.length === 0 ? (
            <div className="p-6 text-center text-gray-600">No books found.</div>
          ) : (
            <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {books.map((book) => (
                <li key={book._id}>
                  <article className="flex flex-col h-full bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-150">
                    <div className="bg-gray-100 overflow-hidden flex items-center justify-center">
                      {book.image && book.image.secure_url ? (
                        <img
                          src={book.image.secure_url}
                          alt={
                            book.title ? `${book.title} cover` : "book cover"
                          }
                          className="w-full object-contain cursor-pointer"
                          style={{ maxHeight: "60vh" }}
                          onClick={() => {
                            setModalSrc(book.image.secure_url);
                            setModalAlt(book.title || "book image");
                            setModalOpen(true);
                          }}
                        />
                      ) : (
                        <div className="w-full h-32 flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="font-medium text-gray-800 truncate">
                          {book.title}
                        </h2>
                        <p className="text-sm text-gray-600">
                          by {book.author || "Unknown"}
                        </p>
                        <div className="mt-2 text-xs text-gray-500">
                          <div>ISBN: {book.ISBN || "—"}</div>
                          <div>Published: {book.publishedDate || "—"}</div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                          Available: <strong>{book.count ?? 0}</strong>
                        </span>
                        <button
                          onClick={() => editfunction(book._id)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none"
                        >
                          edit
                        </button>
                        <button
                          onClick={() => deletefunction(book._id)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {/* Image modal / lightbox */}
      {modalOpen && modalSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-w-[90%] max-h-[90%] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close image"
              onClick={() => setModalOpen(false)}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
            >
              ✕
            </button>
            <img
              src={modalSrc}
              alt={modalAlt}
              className="w-full h-auto max-h-[85vh] object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home_page;
