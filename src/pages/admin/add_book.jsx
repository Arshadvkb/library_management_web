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
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-purple-300 to-blue-600">
        <form onSubmit={submitHandler}>
          <div className="flex flex-col flex-wrap gap-2 bg-blue-400 p-4 rounded-xl m-4">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="bg-blue-300 p-2 rounded-2xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-700 file:text-white hover:file:bg-blue-800"
            />
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="bg-blue-300 p-2 rounded-2xl"
              type="text"
              placeholder="Book Title.."
            />
            <input
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
              className="bg-blue-300 p-2 rounded-2xl"
              type="text"
              placeholder="Author"
            />
            <input
              onChange={(e) => setDate(e.target.value)}
              value={publishedDate}
              className="bg-blue-300 p-2 rounded-2xl"
              type="date"
              placeholder="Published Date"
            />
            <input
              onChange={(e) => setIsbn(e.target.value)}
              value={ISBN}
              className="bg-blue-300 p-2 rounded-2xl"
              type="number"
              placeholder="ISBN"
            />
            <input
              onChange={(e) => setCount(e.target.value)}
              value={count}
              className="bg-blue-300 p-2 rounded-2xl"
              type="number"
              placeholder="count"
            />
            <br />
            <button className="bg-blue-300 p-2 rounded-2xl">Add Book</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_book;
