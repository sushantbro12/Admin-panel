import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Nav from "../component/Nav"; // Import the Nav component
import Sidebar from "../component/Sidebar"; // Import the Sidebar component
import { Link } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
    };

    fetchOrders();
  }, []);

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.orderStatus === statusFilter);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar />

      <div className="flex-1 overflow-auto relative z-10">
        {/* Nav Component */}
        <Nav title="Orders" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          {/* <h1 className="text-3xl font-bold mb-4">Order List</h1> */}

          <label className="block mb-4">
            <span className="text-gray-400">Filter by status:</span>
            <select
              onChange={(e) => setStatusFilter(e.target.value)}
              value={statusFilter}
              className="mt-1 block w-full bg-gray-800 text-gray-100 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-600">
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </label>

          <motion.table
            className="min-w-full divide-y divide-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <thead>
              <tr>
                <th className=" py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User Name
                </th>
                <th className=" py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider ">
                  Product ID
                </th>
                <th className=" py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Quantity
                </th>
                <th className=" py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Total Price
                </th>
                <th className=" py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Order Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredOrders.map((order) =>
                order.productsOrdered.map((product, index) => (
                  <motion.tr
                    key={`${order.id}-${index}`}
                    className="hover:bg-gray-800 transition duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    {index === 0 ? (
                      <td
                        rowSpan={order.productsOrdered.length}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                        <Link to={`/order/${order.id}`}>{order.userName}</Link>
                      </td>
                    ) : null}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {product.productId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {product.quantity}
                    </td>
                    {index === 0 ? (
                      <>
                        <td
                          rowSpan={order.productsOrdered.length}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {order.totalPrice}
                        </td>
                        <td
                          rowSpan={order.productsOrdered.length}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {order.orderStatus}
                        </td>
                      </>
                    ) : null}
                  </motion.tr>
                ))
              )}
            </tbody>
          </motion.table>
        </main>
      </div>
    </div>
  );
};

export default OrderList;
