import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Add_book = () => {
  const { backendurl } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setDate] = useState("");
  const [ISBN, setIsbn] = useState("");
  const [count, setCount] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate()

  const bookadded = () => toast("book added successfuly");
  const bookaddfailed = () => toast("Failed to add book");

  useEffect(() => {
    if (file) {
      console.log("File updated:", file);
    }
  }, [file]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData(); 
    formData.append("title", title);
    formData.append("author", author);
    formData.append("publishedDate", publishedDate);
    formData.append("ISBN", ISBN);
    formData.append("count", count);
    formData.append("file", file);

    const { data } = await axios.post(backendurl + "/api/book/add-book", formData);
    const { success } = data;
    if (success) {
      bookadded();
      navigate("/admin/viewbook",{replace:true});

    }
    else{
      bookaddfailed()
    }
    console.log(data);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Book</h1>
            <p className="text-gray-600">Add a new book to the library collection</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={submitHandler} className="space-y-6">
              {/* Book Cover Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Cover Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

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

              {/* Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Copies
                </label>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  placeholder="Enter number of copies"
                  min="1"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder-gray-400"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Adding Book...
                  </div>
                ) : (
                  "Add Book"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Add_book;
