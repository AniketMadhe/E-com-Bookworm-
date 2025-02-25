import { React, useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../configUrl";

function Cart() {
  const [cartBooks, setCartBooks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refresh2, setRefresh2] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userAddress, setUserAddress] = useState("");

  const [hiddenAddressDiv, setHiddenAddressDiv] = useState(false);
  const [userID, setUserId] = useState();

  useEffect(() => {
    const fetchingCartBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/getCartBooks`, {
          withCredentials: true,
        });

        setCartBooks(response.data.cart);
        const total = response.data.cart.reduce(
          (acc, book) => acc + book.price,
          0
        );
        setTotalPrice(total);
      } catch (e) {
        console.log(e);
      }
    };
    fetchingCartBooks();
  }, [refresh, refresh2]);

  {
    /** for fetching user address */
  }
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/welcome`, {
          withCredentials: true,
        });
        setUserAddress(response.data.address);
        setUserId(response.data._id);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUserDetails();
  }, []);

  const handleRemove = async (bookId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/cartBookRemove`,
        { bookId },
        { withCredentials: true }
      );
      if (response) {
        setRefresh((prev) => !prev);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleOrder = async (e) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/handleOrder`,
        { cartBooks, userAddress },
        { withCredentials: true }
      );
      if (response) {
        alert("Order placed");
        setRefresh2((prev) => !prev);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addressUpdate = async () => {
    try {
      console.log("Iaddnfndndfnfdnsfn");
      const response = await axios.put(
        `${BASE_URL}/api/updateUserAddress/${userID}`,
        { userAddress },
        { withCredentials: true }
      );
      alert("Address updated");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="md:w-full w-screen h-auto flex flex-col md:flex-row my-4 md:my-0 min-h-screen md:h-screen md:flex ">
      <div className="md:w-2/3 w-full h-auto flex justify-center items-center md:h-full ">
        <ul className="md:w-full md:h-full w-full h-auto flex flex-wrap gap-4 my-4 justify-center gap:4 items-center md:flex md:justify-around md:gap-6 md:flex-wrap">
          {cartBooks.map((book) => (
            <li
              key={book._id}
              className="md:w-[150px] md:h-[250px] w-[100px] h-[150px]   md:overflow-hidden md:m-4 border shadow-[3px_3px_8px_rgba(0,0,0,2),-1px_-1px_6px_rgba(0,0,0,2)] "
            >
              <img
                src={`${book.imageUrl}`}
                alt="book image"
                className="md:w-full md:h-[65%] w-full h-[70%] object-cover border "
              />
              <div className="md:w-full md:h-[33%] w-full h-[30%] flex flex-col justify-center items-center md:flex md:flex-col md:items-center md:justify-between ">
                <h3 className="md:block hidden">{book.title}</h3>
                <p className="md:block hidden">{book.author}</p>
                <button
                  onClick={() => {
                    handleRemove(book._id);
                  }}
                  className="border  border-gray-500  md:px-[8px] md:py-[2px] px-3 rounded-sm hover:text-white hover:bg-red-700 "
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:w-1/3 md:h-full w-full h-auto text-center  border border-gray-500  bg-gradient-to-br from-gray-400 to-blue-800 md:flex md:flex-col md:gap-[10px]">
        <h2 className="font-bold">Order Summary</h2>
        {cartBooks.map((book) => (
          <div
            key={book._id}
            className="md:w-full md:h-[50px]  flex justify-between items-center my-2 bg-white  md:flex md:gap-8 md:items-center md:justify-between md:px-4  "
          >
            <div className="md:flex-shrink-0  ">
              <img
                src={book.imageUrl}
                alt="book Image"
                className="md:w-[40px] md:h-[40px] w-[60px] h-[70px] object-cover "
              />
            </div>

            <h3>{book.title}</h3>
            <div className="md:flex-shrink-0">
              <h4 className="mr-6">{book.price} </h4>
            </div>
          </div>
        ))}
        <div className=" md:w-full md:h-[50px] w-full  h-1/5   bg-white justify-between flex">
          {!hiddenAddressDiv && (
            <div className="bg-white   md:w-[60%] md:flex  w-[60%] h-full flex md:items-center px-2 pt-[2px]">
              <h4 className="">Address : {userAddress} </h4>
              <i
                onClick={() => setHiddenAddressDiv(true)}
                className="ri-edit-box-fill text-xl cursor-pointer"
              ></i>
            </div>
          )}
          {/**hidden*/}
          {hiddenAddressDiv && (
            <div className="  md:w-[60%] md:flex w-[60%] h-full md:items-center md:gap-2 cursor-pointer ">
              <i
                onClick={() => setHiddenAddressDiv(false)}
                className="ri-arrow-left-circle-fill"
              ></i>
              <input
                className="md:w-full "
                type="text"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                required
              />
              <i onClick={addressUpdate} className="ri-save-fill"></i>
            </div>
          )}
          {/**hidden */}
          <div className="bg-gray-400 border border-gray-500 w-[40%] flex items-center justify-center pr-4 ">
            <h2>Total: {totalPrice}</h2>
          </div>
        </div>
        <div className=" md:w-full md:h-[40px] my-4  md:flex md:justify-center md:items-center">
          <button
            onClick={() => {
              handleOrder();
            }}
            className="bg-gradient-to-t from-blue-950 to-blue-700 px-3 py-1 rounded-xl text-white border border-gray-600 hover:text-gray-300 hover:border-white "
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
