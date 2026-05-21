import { useState, useEffect, useCallback } from "react";
import { Header } from "../component/Header";
import axios from "axios";
import API_URL from "../Api";
import toast from "react-hot-toast";

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
      toast.error("Failed to fetch products");
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
    toast.error("Please enter a name");
    return;
  }

  if (!image) {
    toast.error("Please select an image");
    return;
  }

  const loadingToast = toast.loading("Uploading product...");

  setUploading(true);

  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", image);

    await axios.post(
      `${API_URL}/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.dismiss(loadingToast);

    toast.success("Upload successful!");

    setName("");
    setImage(null);
    setImagePreview(null);
    setIsModalOpen(false);

    fetchProducts();

  } catch (error) {
    console.error(error);

    toast.dismiss(loadingToast);

    toast.error(
      error.response?.data?.message || "Upload failed"
    );

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
    toast.success("Product deleted");

  } catch (error) {
    console.error(error);
    toast.error("Failed to delete product");
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
    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 flex flex-col h-full"
  >
    {/* Image */}
    <div className="relative aspect-square overflow-hidden bg-gray-100">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-300">
          <span className="text-6xl">📦</span>
        </div>
      )}

      {/* Optional badge / status */}
      {/* <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-emerald-600">In Stock</div> */}
    </div>

    {/* Content */}
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-2">
        {product.name}
      </h3>

      {/* Add more details as needed */}
      {product.price && (
        <p className="text-2xl font-bold text-gray-900 mt-auto">
          ₦{product.price.toLocaleString()}
        </p>
      )}

      {/* Delete Button - Modern & Professional */}
      <button
        onClick={() => onDelete(product._id)}
        className="mt-6 flex items-center justify-center gap-2.5 w-full bg-white border border-red-200 hover:border-red-300 hover:bg-red-50 text-red-600 hover:text-red-700 py-3.5 rounded-2xl font-medium transition-all duration-200 active:scale-[0.985]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.595 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.595-1.858L5 7m5-4v6m4-6v6m1-10V9a1 1 0 00-1 1v1M12 4v6"
          />
        </svg>
        Delete Product
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