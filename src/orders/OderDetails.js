// src/component/OrderDetails.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Sidebar from "../component/Sidebar";
import Nav from "../component/Nav";

const OrderDetails = () => {
  const { id: orderId } = useParams(); // Get the order ID from the route
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        console.error("Order ID is undefined");
        return;
      }

      const orderDoc = doc(db, "orders", orderId); // Ensure orderId is correct
      const orderSnapshot = await getDoc(orderDoc);

      if (orderSnapshot.exists()) {
        setOrder({ id: orderSnapshot.id, ...orderSnapshot.data() });
      } else {
        console.error("No such order!");
      }
      setLoading(false);
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>No order found.</div>;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto relative z-10">
        <Nav title={`Order Details - ${order.userName}`} />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Order Information</h2>
            <table className="min-w-full divide-y divide-gray-700 mb-6">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Field
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    User Name
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.userName}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    Order Status
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.orderStatus}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    Total Price
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.totalPrice}
                  </td>
                </tr>
              </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-4">Products Ordered</h2>
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Product ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {order.productsOrdered.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {product.productId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {product.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderDetails;
