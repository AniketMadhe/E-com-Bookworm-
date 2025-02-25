import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../configUrl";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/books`, {
          withCredentials: true,
        });
        setBooks(response.data.slice(0, 5));
      } catch (e) {
        console.log(e);
      }
    };
    fetchBooks();
  }, []);

  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div className="md:w-full md:min-h-screen md:h-auto w-screen min-h[100vh] flex flex-col justify-center items-center  md:flex md:flex-col md:justify-start md:gap-4 md:items-center">
      <h2 className="font-bold text-center md:mt-5 text-lg">Featured Books</h2>
      <ul className="md:w-[90%] md:h-[50%] w-full h-full flex flex-wrap justify-center items-center md:flex md:flex-wrap md:justify-center md:items-center  md:gap-6 ">
        {books.map((book) => (
          <div
            className="md:w-1/6 md:h-[40%] w-[40vw] h-[30vh] m-4 md:m-0 border   border-gray-500 shadow-[4px_4px_5px_rgba(0,0,0,0.8)]"
            key={book._id}
          >
            <li className="md:w-full w-full h-f md:h-[80%]">
              <img
                className="md:w-full md:h-full w-full h-full md:object-cover"
                src={book.imageUrl}
                alt=""
              />
              <h4 className="md:w-full md:h-[10%]  font-semibold md:text-center mt-4">
                {book.title}
              </h4>
            </li>
          </div>
        ))}
      </ul>
      <button
        onClick={handleClick}
        className="font-semibold md:mt-4 md:mb-4 my-4   px-5 py-1 rounded-sm bg-gray-900 text-white hover:bg-gray-800 "
      >
        Get Started
      </button>
    </div>
  );
}

export default Books;
