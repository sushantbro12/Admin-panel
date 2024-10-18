import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    imageURL: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Firebase Storage and get URL
    let imageURL = "";
    if (image) {
      const storageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(storageRef, image);
      imageURL = await getDownloadURL(storageRef);
    }

    // Add product data to Firestore
    await addDoc(collection(db, "products"), {
      ...product,
      price: parseFloat(product.price),
      stock: parseInt(product.stock),
      imageURL,
    });

    // Clear form after submission
    setProduct({
      name: "",
      price: "",
      category: "",
      stock: "",
      imageURL: "",
    });
    setImage(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Add New Product
      </h2>

      <div>
        <label className="block text-gray-400 mb-1">Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="block w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg p-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-400 mb-1">Price</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="block w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg p-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-400 mb-1">Category</label>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          className="block w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg p-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-400 mb-1">Stock</label>
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          className="block w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg p-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-400 mb-1">Product Image</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="block w-full text-gray-400 bg-gray-700 rounded-lg p-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
