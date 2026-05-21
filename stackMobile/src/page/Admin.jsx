import { useState, useEffect, useCallback } from "react";
import { Header } from "../component/Header";
import axios from "axios";
import API_URL from "../Api";

export function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/details`);
      setProducts(res.data.data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  

  // Handle image selection + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const SubmitEvent = async () => {
    if (!name.trim()) {
      alert("Please enter a name");
      return;
    }
    if (!image) {
      alert("Please select an image");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      const res = await axios.post(
        `${API_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(res.data);
      alert("Upload Successful!");

      // Reset form
      setName("");
      setImage(null);
      setImagePreview(null);
      setIsModalOpen(false);

      // Refresh products list
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };
  const onDelete = async (id) => {
  try {
    await axios.delete(`${API_URL}/api/delete/${id}`);

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== id)
    );

  } catch (error) {
    console.error(error);
    alert("Failed to delete product");
  }
};
  

  return (
    <div>
      <Header />

      <main className="pt-20 flex flex-col items-center px-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                     text-white font-semibold text-lg rounded-2xl transition-all active:scale-95 shadow-xl flex items-center gap-2"
        >
          📸 Upload Image
        </button>

        {loading ? (
  <div className="mt-10 text-center text-gray-600 text-lg">
    Loading products...
  </div>
) : products.length === 0 ? (
  <div className="text-center py-20">
    <p className="text-2xl text-gray-400">No products found</p>
    <p className="text-gray-500 mt-2">
      Add products to manage them here
    </p>
  </div>
) : (
  <div className="px-4 sm:px-6 lg:px-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">

      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
        >

          {/* IMAGE */}
          <div className="relative h-56 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute bottom-3 left-3">
              <span className="text-white text-sm font-semibold">
                {product.name}
              </span>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-4 flex flex-col gap-3">

            {/* DELETE BUTTON */}
            <button
              onClick={() => onDelete(product._id)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              🗑 Delete Product
            </button>

          </div>
        </div>
      ))}

    </div>
  </div>
)}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Upload Image
            </h2>

            <input
              type="text"
              placeholder="Name of phone image"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
            />

            {imagePreview && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Preview:</p>
                <img
                  src={imagePreview}
                  alt="preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            <button
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
              onClick={SubmitEvent}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}