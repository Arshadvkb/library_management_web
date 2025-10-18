import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const User_home_page = () => {
  const { backendurl, userData } = useContext(AppContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState(null);
  const [modalAlt, setModalAlt] = useState("");
  const [rentModalOpen, setRentModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [dueDate, setDueDate] = useState("");

  
  const navigate = useNavigate();
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
  }, []);


  const openRentModal = (id) => {
    setSelectedBookId(id);
    setRentModalOpen(true);
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    setDueDate(today);
  };

  const rentfunction = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(backendurl + "/api/user/rent-book", {
        user_id: userData._id,
        book_id: selectedBookId,
        dueDate: dueDate
      });
      
      if (data.success) {
        toast.success("Book rented successfully!");
        // Update the books list to reflect the new available count
        viewBooks();
      } else {
        toast.error(data.message || "Failed to rent book");
      }
      
      // Close the modal
      setRentModalOpen(false);
      setSelectedBookId(null);
      setDueDate("");
    } catch (error) {
      console.error("Error renting book:", error);
      toast.error("Failed to rent book. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userData?.name || 'User'}!</h1>
            <p className="text-gray-600">Discover and rent books from our library</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Total Books</h3>
                  <p className="text-2xl font-bold text-blue-600">{books.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Available</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {books.filter(book => book.available_count > 0).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {new Set(books.map(book => book.category)).size}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Books Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Available Books</h2>
              <Link 
                to="/user/home" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                View All
              </Link>
            </div>

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
                          Available:{" "}
                          <strong>{book.available_count ?? 0}</strong>
                        </span>
                        <button
                          onClick={() => openRentModal(book._id)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none"
                          disabled={book.available_count <= 0}
                        >
                          {book.available_count <= 0 ? 'Not Available' : 'Rent'}
                        </button>
                       
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
          </div>
        </div>
      </main>

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

      {/* Rent Modal */}
      {rentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Select Return Date</h2>
            <form onSubmit={rentfunction}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRentModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Confirm Rent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default User_home_page;
