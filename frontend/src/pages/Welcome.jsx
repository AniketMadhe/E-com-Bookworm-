import { React, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../configUrl";
import axios from "axios";
import { LoginContext } from "../App";

function Welcome() {
  const { isLogin, setIsLogin, isAdmin, setIsAdmin, userId, setUserId } =
    useContext(LoginContext);
  const [bookImages, setBookImages] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/welcome`, {
          withCredentials: true,
        });

        if (response.data.email) {
          setIsLogin(true);
          setUserId(`${response.data._id}`);
        }
        if (response.data.role == "admin") {
          setIsAdmin(true);
          navigate("/adminDashboard");
        }
        if (response.data.role == "user") {
          setIsAdmin(false);
        }
      } catch (e) {
        if (e.response.status === 401) {
          navigate("/login");
        }
      }
    };
    validateToken();
  }, []);

  useEffect(() => {
    const fetchingBookImages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/getBooks`, {
          withCredentials: true,
        });

        setBookImages(response.data.slice(0, 4));
      } catch (e) {
        console.log(e);
      }
    };
    fetchingBookImages();
  }, []);

  const handleExploreBooks = () => {
    navigate("/homeBooks");
  };
  return (
    <div className="md:w-full md:h-screen w-full min-h-screen h-auto  md:flex md:gap-5 ">
      <div
        style={{ perspective: "800px" }}
        className="md:w-2/5 md:h-screen md:flex md:justify-center flex justify-center  items-center w-full h-[40vh]   "
      >
        <div
          style={{
            transformStyle: "preserve-3d",
            animation: "rotateCarousel 10s infinite linear",
          }}
          className=" md:flex md:justify-center flex justify-center items-center relative w-full h-[60%]  md:items-center md:relative md:w-[90%] md:h-[80%]  md:mt-14"
        >
          {bookImages.map((book, i) => (
            <div
              style={{
                transform: `rotateY(${
                  (360 / bookImages.length) * i
                }deg) translateZ(200px)`,
              }}
              className="md:absolute absolute m:w-[200px] md:h-[300px] w-[150px] h-200px "
              key={book._id}
            >
              <img className="md:w-full md:h-full" src={book.imageUrl} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-3/5 md:h-full  p-6 flex flex-col gap-5  items-center   md:flex md:flex-col md:p-20 md:pt-36 md:justify-start md:items-center md:gap-8">
        <h2 className="text-5xl font-semibold font-sans   md:mt-30">
          Your next favorite book is just a click away.
        </h2>
        <p>
          Discover books that spark joy and ignite your imagination in seconds.
          Dive into a curated collection of timeless classics, thrilling
          adventures, and heartwarming tales. Whether you're seeking inspiration
          or an escape, your next great read is waiting to be uncovered.
        </p>
        <button
          onClick={handleExploreBooks}
          className="border md:px-4 py-1 px-2 w-fit rounded-2xl mt-4  text-black border-gray-900 font-semibold hover:bg-gradient-to-t from-blue-950 to-blue-700 hover:text-white "
        >
          Explore books
        </button>
      </div>

      <style>
        {`
      @keyframes rotateCarousel {
         0%{
         transform:rotateY(0deg);
         }
         100%{
         transform:rotateY(360deg);
         }
      }
      `}
      </style>
    </div>
  );
}

export default Welcome;
