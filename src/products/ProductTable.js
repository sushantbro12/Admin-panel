import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
  });

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  // Real-time Firestore listener
  useEffect(() => {
    const productsCollection = collection(db, "products");
    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const productsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
      setFilteredProducts(productsList); // Update filtered products in real-time
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter((product) => product.id !== id));
    setFilteredProducts(
      filteredProducts.filter((product) => product.id !== id)
    ); // Update filtered list as well
  };

  // Edit product (show edit form)
  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });
  };

  // Update product in Firestore
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { name, category, price, stock } = editFormData;

    await updateDoc(doc(db, "products", editingProduct.id), {
      name,
      category,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
    });

    setEditingProduct(null); // Close the edit form after updating
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}>
      {/* Search bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Product List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                  <img
                    src={product.imageURL || "https://placehold.co/600x400"}
                    alt={product.name}
                    className="size-10 rounded-full"
                  />
                  {product.name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.category}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    className="text-indigo-400 hover:text-indigo-300 mr-2"
                    onClick={() => handleEdit(product)}>
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(product.id)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit form */}
      {editingProduct && (
        <form className="mt-6" onSubmit={handleUpdate}>
          <h3 className="text-lg text-gray-100">
            Edit Product: {editingProduct.name}
          </h3>
          <div className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              className="bg-gray-700 text-white rounded-lg p-2"
              placeholder="Product Name"
              value={editFormData.name}
              onChange={(e) =>
                setEditFormData({ ...editFormData, name: e.target.value })
              }
            />
            <input
              type="text"
              className="bg-gray-700 text-white rounded-lg p-2"
              placeholder="Category"
              value={editFormData.category}
              onChange={(e) =>
                setEditFormData({ ...editFormData, category: e.target.value })
              }
            />
            <input
              type="number"
              className="bg-gray-700 text-white rounded-lg p-2"
              placeholder="Price"
              value={editFormData.price}
              onChange={(e) =>
                setEditFormData({ ...editFormData, price: e.target.value })
              }
            />
            <input
              type="number"
              className="bg-gray-700 text-white rounded-lg p-2"
              placeholder="Stock"
              value={editFormData.stock}
              onChange={(e) =>
                setEditFormData({ ...editFormData, stock: e.target.value })
              }
            />
            <button
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2"
              type="submit">
              Update Product
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default ProductsTable;
