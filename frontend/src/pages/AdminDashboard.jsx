import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../configUrl";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/getBooks`, {
          withCredentials: true,
        });
        setBooks(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllBooks();
  }, []);

  const handleBookClick = (id) => {
    navigate("/adminEditBook", { state: { id } });
  };

  return (
    <div className="md:w-full md:min-h-screen w-screen h-auto min-h-screen md:h-auto md:flex md:justify-center md:items-start border  ">
      <ul className="md:w-[90%] md:h-[90%] w-full h-auto flex flex-wrap gap-4 my-5  justify-center items-center  md:mt-8  md:flex md:justify-center md:items-center md:gap-4 md:flex-wrap">
        {books.map((book) => (
          <li
            onClick={() => {
              handleBookClick(book._id);
            }}
            className="md:w-48 md:h-72 w-1/3 h-1/3 md:mx-2 md:my-2 m-4 border border-gray-500 cursor-pointer rounded-sm shadow-[4px_4px_10px_rgba(0,0,0,3)]"
            key={book._id}
          >
            <img
              className="md:w-full md:h-[80%] object-cover"
              src={book.imageUrl}
              alt="image"
            />

            <h4 className="md:w-full md:h-[20%] text-[13px] font-semibold border bg-white md:flex md:justify-center md:items-center ">
              {book.title}
            </h4>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
