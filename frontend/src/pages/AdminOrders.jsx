import { React, useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../configUrl";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchingAllOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/getAllOrders`, {
          withCredentials: true,
        });
        setOrders(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchingAllOrders();
  }, [refresh]);

  const handleOrderStatus = async (id, statusValue) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/handleOrderStatus/${id}`,
        { statusValue },
        { withCredentials: true }
      );
      alert("Status updated successfully!");
      setRefresh((prev) => !prev);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="md:w-full md:min-h-screen w-screen min-h-screen flex flex-col gap-2 my-3 h-auto md:h-screen ">
      <h2 className="text-black text-center my-3 font-bold">All Orders</h2>
      <ul className="md:flex md:flex-col flex flex-col gap-4 justify-center  md:gap-8 ">
        {orders.map((order) => (
          <li
            className="md:flex md:justify-around md:items-center p-4 bg-gray-400"
            key={order._id}
          >
            <h4>Time : {new Date(order.createdAt).toLocaleDateString()}</h4>
            <h4>Email:{order.email}</h4>
            <h4>Address:{order.userAddress}</h4>

            <details>
              <summary>Books :</summary>
              {order.bookId.map((book) => (
                <h5 key={book._id}>{book.title} ,</h5>
              ))}
            </details>

            <h4>
              Status:{" "}
              <select
                className="bg-gray-200 border border-gray-500 outline-none "
                value={order.status}
                onChange={(e) => handleOrderStatus(order._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="out for delivery">Out for delivery</option>
                <option value="canceled">Canceled</option>
              </select>
            </h4>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminOrders;
