import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../configUrl";
import { Link } from "react-router-dom";
import { LoginContext } from "../App";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin, setIsLogin, isAdmin, setIsAdmin } = useContext(LoginContext);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${BASE_URL}/api/logout`, {
        withCredentials: true,
      });
      setIsLogin(false);
      setIsAdmin(false);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="md:w-full md:h-20 w-screen h-[10vh] relative flex justify-between items-center  bg-gradient-to-b from-blue-950  to-blue-100 bg-green-400 md:flex md:items-center md:justify-between ">
      <div className="md:w-20 md:h-20 w-[22vw]  ml-2 h-full rounded-full overflow-hidden  md:ml-6 md:rounded-full md:overflow-hidden">
        <img
          className="md:w-full  w-full h-full  md:h-full"
          src="https://img.pikbest.com/png-images/book-logo-vector-graphic-element_1792850.png!f305cw"
          alt=""
        />
      </div>
      <div>
        <h1 className=" md:ml-40 font-extrabold text-3xl text-slate-950">
          BookWorm
        </h1>
      </div>
      {/** menu for mobile devices */}

      {!isOpen && (
        <i
          className="ri-menu-line md:hidden text-3xl mr-3 "
          onClick={() => setIsOpen(true)}
        ></i>
      )}
      {isOpen && (
        <i
          className="ri-close-circle-fill z-10 text-3xl mr-3 "
          onClick={() => setIsOpen(false)}
        ></i>
      )}
      {/**LINKS FOR MOBILE DEVICES */}
      {isOpen && (
        <div className="bg-gray-900 bg-opacity-45 absolute flex flex-col pointer-events-auto justify-center items-center gap-5 top-0 right-0 w-[60vw] min-h-[40vh]">
          <ul className=" w-full h-full flex justify-center flex-col items-center gap-4 z-50 ">
            {/**LINKS IF USER IS NOT LOGGED IN */}
            {!isLogin && (
              <>
                <li className="text-white ">
                  <Link to="/books">BOOKS</Link>
                </li>
                <li className="text-white ">
                  <Link to="/signup">SIGNUP</Link>
                </li>
                <li className="text-white ">
                  <Link to="/login">LOGIN</Link>
                </li>
              </>
            )}
            {/**LINKS IF USER IS LOGGED IN BUT IS NOT ADMIN */}
            {isLogin && !isAdmin && (
              <>
                <li className="text-white">
                  <Link to="/">HOME</Link>
                </li>
                <li className="text-white">
                  <Link to="/homeBooks">BOOKS</Link>
                </li>
                <li className="text-white">
                  <Link to="/cart">CART</Link>
                </li>
                <li className="text-white">
                  <Link to="/orderHistory">ORDER HISTORY</Link>
                </li>
                <button className="text-xl text-red-500" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
            {/**LINKS IF USER IS LOGGED AND IS ADMIN */}
            {isLogin && isAdmin && (
              <>
                <li className="text-white">
                  <Link to="/adminDashboard">DASHBOARD</Link>
                </li>
                <li className="text-white">
                  <Link to="/adminOrders">ORDERS</Link>
                </li>
                <li className="text-white">
                  <Link to="/adminAddBook">ADD BOOK</Link>
                </li>
                <button
                  className="hover:text-slate-800 text-red-500"
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </>
            )}
          </ul>
        </div>
      )}

      {/**LINKS FOR DESKTOP */}
      <ul className="md:flex md:justify-center md:visible hidden  md:items-center md:gap-6 md:mr-6 md:flex-wrap ">
        {/**Links if user not logged in  */}
        {!isLogin && (
          <>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/books"> Books</Link>
            </li>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/signup"> Signup</Link>
            </li>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/login"> Login</Link>
            </li>
          </>
        )}
        {/**Links if user logged in but is not (admin)  */}
        {isLogin && !isAdmin && (
          <>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/"> Home</Link>
            </li>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/homeBooks">Books</Link>
            </li>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/cart"> Cart</Link>
            </li>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/orderHistory"> Order history</Link>
            </li>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
        {isLogin && isAdmin && (
          <>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/adminDashboard"> DashBoard</Link>
            </li>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/adminOrders">Orders</Link>
            </li>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/adminAddBook"> Add book</Link>
            </li>

            <button className="hover:text-slate-800" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
