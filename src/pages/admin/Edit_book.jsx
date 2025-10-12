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

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-purple-300 to-blue-600">
        <form onSubmit={submissionHandler}>
          <div className="flex flex-col flex-wrap gap-2 bg-blue-400 p-4 rounded-xl m-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-blue-300 p-2 rounded-2xl"
              type="text"
              placeholder="Book title"
            />
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="bg-blue-300 p-2 rounded-2xl"
              type="text"
              placeholder="Author"
            />
            <input
              value={ISBN}
              onChange={(e) => setIsbn(e.target.value)}
              className="bg-blue-300 p-2 rounded-2xl"
              type="number"
              placeholder="ISBN"
            />
            <input
              value={publishedDate}
              onChange={(e) => setDate(e.target.value)}
              className="bg-blue-300 p-2 rounded-2xl"
              type="date"
              placeholder="Published Date"
            />
            <br />
            <button 
              type="submit"
              disabled={loading}
              className={`bg-blue-300 p-2 rounded-2xl ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'}`}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit_book;
