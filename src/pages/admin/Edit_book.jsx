import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Edit_book = () => {
  const location = useLocation();
  const { backendurl } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setDate] = useState("");
  const [ISBN, setIsbn] = useState("");
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate()

  useEffect(() => {
    console.log("Edit_book location.state:", location.state);

    const incoming = location.state?.book;
    if (incoming) {
      setBook(incoming);
      setTitle(incoming.title || "");
      setAuthor(incoming.author || "");
      setIsbn(incoming.ISBN || "");
      // Format the date for input
      const date = incoming.publishedDate ? new Date(incoming.publishedDate) : null;
      if (date && !isNaN(date)) {
        const formattedDate = date.toISOString().split('T')[0];
        setDate(formattedDate);
      }
    } else {
      console.error("No book data received in location.state", location.state);
    }
  }, [location]);

  const formatDateForInput = (date) => {
    if (!date) return "";

    let d = date instanceof Date ? date : null;

    if (typeof date === "number") d = new Date(date);

    if (!d && typeof date === "string") {
      d = new Date(date);
    }
    if (!d || Number.isNaN(d.getTime())) return "";

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const formattedPublishedDate = formatDateForInput(book?.publishedDate);

  const submissionHandler = async (e) => {
    e.preventDefault();

    if (!book?._id) {
      console.error("No book ID available for update");
      return;
    }

    setLoading(true);
    try {
      const updatedBook = {
        title,
        author,
        publishedDate,
        ISBN
      };

      const { data } = await axios.put(
        `${backendurl}/api/book/edit-book/${book._id}`,
        updatedBook
      );

      if (data.success) {
        toast.success("Book updated successfully!");
      
        navigate("/admin/viewbook");
      }
    } catch (error) {
      console.error("Failed to update book:", error);
      toast.error("Failed to update book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <main className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">No Book Selected</h1>
              <p className="text-gray-600 mb-6">Please select a book to edit from the book list.</p>
              <button
                onClick={() => navigate("/admin/viewbook")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Back to Books
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Book</h1>
            <p className="text-gray-600">Update book information</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={submissionHandler} className="space-y-6">
              {/* Book Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter book title"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder-gray-400"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder-gray-400"
                />
              </div>

              {/* ISBN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ISBN
                </label>
                <input
                  type="text"
                  value={ISBN}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder="Enter ISBN number"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder-gray-400"
                />
              </div>

              {/* Published Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Published Date
                </label>
                <input
                  type="date"
                  value={publishedDate}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => navigate("/admin/viewbook")}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Updating...
                    </div>
                  ) : (
                    "Update Book"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Edit_book;
