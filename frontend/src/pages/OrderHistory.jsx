import axios from "axios";
import { React, useState, useEffect } from "react";
import BASE_URL from "../configUrl";
axios;
import { format } from "date-fns/fp";

function OrderHistory() {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/orderHistory`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setMyOrders(response.data.orders);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchOrderHistory();
  }, []);
  return (
    <div className="md:w-full md:h-screen w-full h-auto min-h-screen md:flex ">
      <div className="md:w-2/3 md:h-full w-full h-auto mt-[5%] md:mt-0 bg-white ">
        <ul className="md:flex md:flex-col w-full h-auto flex flex-col justify-center items-center gap-3 md:justify-around md:items-center md:gap-8 md:mx-2 md:my-2">
          {myOrders.map((order) => (
            <div
              className="md:w-full md:h-10 w-full h-auto flex gap-5 bg-gray-300 md:flex md:justify-around md:items-center md:gap-8"
              key={order._id}
            >
              <li>{order.email}</li>
              <p>
                {new Date(order.createdAt).toLocaleDateString()}
                {" at "}
                {new Date(order.createdAt).toLocaleTimeString("en-us", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              {/** <details>
                <summary>Books</summary>
                {order.bookId.map((book) => (
                  <p key={book._id}>{book.title}</p>
                ))}
              </details> */}
              <p>{order.status}</p>
            </div>
          ))}
          <details>
            <summary>View more</summary>
            <p>/-</p>
          </details>
        </ul>
      </div>
      <div className="border w-1/3 h-full  "></div>
    </div>
  );
}

export default OrderHistory;
